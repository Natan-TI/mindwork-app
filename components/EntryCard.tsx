import React from 'react';
import { View, Text } from 'react-native';
import { Entry } from '../types/entries';

export function EntryCard({ entry }: { entry: Entry }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <View style={{ backgroundColor: '#111827', padding: 12, borderRadius: 8, marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>{formatDate(entry.date)}</Text>
        <Text style={{ color: '#93c5fd', fontSize: 12 }}>
          Humor: {entry.mood} | Estresse: {entry.stress}
        </Text>
      </View>

      <Text style={{ color: '#cbd5f5', marginTop: 4 }}>
        Modo: {entry.workMode === 'home' ? 'Home Office' : entry.workMode === 'office' ? 'Presencial' : 'Híbrido'}
      </Text>

      <Text style={{ color: 'white', marginVertical: 6 }}>{entry.note}</Text>

      <Text style={{ color: '#a5b4fc', fontSize: 12 }}>Sugestão MindWork:</Text>
      <Text style={{ color: '#c7d2fe' }}>{entry.suggestion}</Text>
    </View>
  );
}
