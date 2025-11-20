import { useEffect, useState } from 'react';
import type { Entry, WorkMode } from '../types/entries';
import { getEntriesFromStorage, saveEntriesToStorage } from '../storage/entriesStorage';
import { loadStats, saveStats, MindStats } from '../storage/statsStorage';
import { format } from 'date-fns';

interface AddEntryParams {
  mood: number;
  stress: number;
  workMode: WorkMode;
  note: string;
}

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<MindStats>({
    streak: 0,
    lastCheckinDate: null,
    mindScore: 0,
  });

  useEffect(() => {
    async function load() {
      const items = await getEntriesFromStorage();
      const s = await loadStats();
      setEntries(items);
      setStats(s);
      setLoading(false);
    }
    load();
  }, []);

  function dailyKey(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  function calculateXP(mood: number, stress: number): number {
    const xp = (mood - stress) * 10;
    return xp < 0 ? 0 : xp;
  }

  function updatedStreak(lastDate: string | null): number {
    const today = dailyKey(new Date());

    if (!lastDate) return 1;

    const yesterday = dailyKey(new Date(Date.now() - 24 * 60 * 60 * 1000));

    if (lastDate === today) return stats.streak;
    if (lastDate === yesterday) return stats.streak + 1;

    return 1;
  }

  async function addEntry(params: AddEntryParams): Promise<Entry> {
    const newEntry: Entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...params,
      suggestion: generateSuggestion(params.mood, params.stress),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    await saveEntriesToStorage(updatedEntries);

    // Gamificação
    const newXP = calculateXP(params.mood, params.stress);
    const todayKey = dailyKey(new Date());
    const newStreak = updatedStreak(stats.lastCheckinDate);

    const updatedStats: MindStats = {
      streak: newStreak,
      lastCheckinDate: todayKey,
      mindScore: stats.mindScore + newXP,
    };

    setStats(updatedStats);
    await saveStats(updatedStats);

    return newEntry;
  }

  function generateSuggestion(mood: number, stress: number): string {
    if (mood <= 2 && stress >= 4) {
      return 'Você parece sobrecarregado. Experimente uma pausa e alongamento por 5 min.';
    }
    if (mood <= 3 && stress >= 3) {
      return 'Seu nível de estresse está alto. Tente uma respiração profunda por 2 minutos.';
    }
    if (mood >= 4 && stress <= 2) {
      return 'Ótimo! Continue mantendo hábitos saudáveis.';
    }
    return 'Pausas curtas ao longo do dia ajudam a manter o equilíbrio.';
  }

  const averageMood =
    entries.length > 0
      ? (entries.reduce((s, x) => s + x.mood, 0) / entries.length).toFixed(1)
      : null;

  return { entries, loading, addEntry, averageMood, stats };
}
