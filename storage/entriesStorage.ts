import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entry } from '../types/entries';

const STORAGE_KEY = '@mindwork:entries';

export async function getEntriesFromStorage(): Promise<Entry[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao carregar entradas:', error);
    return [];
  }
}

export async function saveEntriesToStorage(entries: Entry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Erro ao salvar entradas:', error);
  }
}
