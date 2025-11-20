export type WorkMode = 'home' | 'office' | 'hybrid';

export interface Entry {
  id: string;
  date: string;      // ISO string
  mood: number;
  stress: number;
  workMode: WorkMode;
  note: string;
  suggestion: string;
}
