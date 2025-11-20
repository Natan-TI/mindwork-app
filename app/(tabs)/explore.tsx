import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEntries } from '../../hooks/useEntries';

export default function InsightsScreen() {
  const { entries, averageMood } = useEntries();

  const lastEntries = entries.slice(0, 7).reverse();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617' }}>
      <LinearGradient
        colors={['#4c1d95', '#7c3aed', '#a855f7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 22,
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
          Insights MindWork
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '700',
          }}
        >
          Panorama do seu bem-estar
        </Text>
        <Text style={{ color: '#e0e7ff', fontSize: 12, marginTop: 4 }}>
          Acompanhe a evolução do seu humor com base nos check-ins recentes.
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        {/* Card geral */}
        <View
          style={{
            backgroundColor: '#020617',
            borderRadius: 16,
            padding: 16,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#1f2937',
          }}
        >
          <Text
            style={{
              color: '#a5b4fc',
              fontSize: 13,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Visão geral
          </Text>
          <Text
            style={{
              color: '#e5e7eb',
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Humor médio recente: {averageMood ? `${averageMood}/5` : 'sem dados ainda'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>
            Baseado nos check-ins armazenados localmente neste dispositivo.
          </Text>
        </View>

        {/* Gráfico */}
        <Text
          style={{
            color: '#e5e7eb',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 12,
          }}
        >
          Evolução do humor
        </Text>

        {lastEntries.length === 0 ? (
          <Text style={{ color: '#9ca3af' }}>
            Você ainda não registrou nenhum humor. Volte ao Diário e faça seu primeiro check-in.
          </Text>
        ) : (
          <View
            style={{
              backgroundColor: '#020617',
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: '#1f2937',
            }}
          >
            <View
              style={{
                height: 180,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              {lastEntries.map(entry => {
                const barHeight = 20 + entry.mood * 24;

                const labelDate = new Date(entry.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                });

                return (
                  <View
                    key={entry.id}
                    style={{ alignItems: 'center', flex: 1, marginHorizontal: 4 }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: barHeight,
                        borderRadius: 999,
                        backgroundColor: '#a855f7',
                      }}
                    />
                    <Text
                      style={{
                        color: '#9ca3af',
                        fontSize: 11,
                        marginTop: 4,
                      }}
                    >
                      {labelDate}
                    </Text>
                    <Text
                      style={{
                        color: '#e5e7eb',
                        fontSize: 11,
                      }}
                    >
                      {entry.mood}/5
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{ borderTopWidth: 1, borderTopColor: '#1f2937', paddingTop: 8 }}>
              <Text style={{ color: '#9ca3af', fontSize: 12 }}>
                Cada barra representa um check-in recente. Quanto maior a barra, melhor o humor
                registrado naquele momento.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
