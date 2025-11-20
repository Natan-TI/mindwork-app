import AsyncStorage from '@react-native-async-storage/async-storage';

const STATS_KEY = '@mindwork:stats';

export interface MindStats {
  streak: number;
  lastCheckinDate: string | null; // "YYYY-MM-DD"
  mindScore: number;
}

export async function loadStats(): Promise<MindStats> {
  try {
    const data = await AsyncStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : {
      streak: 0,
      lastCheckinDate: null,
      mindScore: 0,
    };
  } catch {
    return { streak: 0, lastCheckinDate: null, mindScore: 0 };
  }
}

export async function saveStats(stats: MindStats): Promise<void> {
  try {
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Erro ao salvar estatísticas', err);
  }
}
