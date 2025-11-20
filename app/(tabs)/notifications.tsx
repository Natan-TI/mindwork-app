import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEntries } from '../../hooks/useEntries';

export default function NotificationsScreen() {
  const { entries } = useEntries();

  const notifications = entries.map(entry => {
    const date = new Date(entry.date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      id: entry.id,
      title: `Sugestão MindWork • ${date}`,
      body: entry.suggestion,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617' }}>
      <LinearGradient
        colors={['#4c1d95', '#7c3aed', '#a855f7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 20,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <Text
          style={{
            color: '#e5e7eb',
            fontSize: 13,
            marginBottom: 4,
          }}
        >
          Alertas inteligentes
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '700',
          }}
        >
          Recomendações da MindWork
        </Text>
        <Text style={{ color: '#e0e7ff', fontSize: 12, marginTop: 4 }}>
          Veja um histórico das recomendações geradas a partir dos seus check-ins.
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        {notifications.length === 0 ? (
          <Text style={{ color: '#9ca3af' }}>
            Nenhuma recomendação ainda. Registre um check-in no Diário para receber sugestões
            personalizadas.
          </Text>
        ) : (
          notifications.map(notification => (
            <View
              key={notification.id}
              style={{
                backgroundColor: '#020617',
                borderRadius: 14,
                padding: 14,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#4c1d95',
              }}
            >
              <Text
                style={{
                  color: '#e5e7eb',
                  fontSize: 14,
                  fontWeight: '600',
                  marginBottom: 4,
                }}
              >
                {notification.title}
              </Text>
              <Text style={{ color: '#c7d2fe', fontSize: 13 }}>{notification.body}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
