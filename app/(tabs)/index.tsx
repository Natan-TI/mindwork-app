import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEntries } from '../../hooks/useEntries';
import { EntryCard } from '../../components/EntryCard';
import { SelectorRow } from '../../components/SelectorRow';
import type { WorkMode, Entry } from '../../types/entries';

const MOCK_USER_NAME = 'Natan';
const MOCK_USER_ROLE = 'Engenharia de Software • MindWork';

export default function HomeScreen() {
  const [mood, setMood] = useState<number>(3);
  const [stress, setStress] = useState<number>(3);
  const [workMode, setWorkMode] = useState<WorkMode>('home');
  const [note, setNote] = useState<string>('');

  const { entries, loading, addEntry, averageMood, stats } = useEntries();

  async function handleSave() {
    if (!note.trim()) {
      Alert.alert('Ops', 'Escreva pelo menos uma frase sobre como você está se sentindo.');
      return;
    }

    const newEntry: Entry = await addEntry({ mood, stress, workMode, note });
    setNote('');
    Alert.alert('Registrado!', newEntry.suggestion);
  }

  const moodOptions = [1, 2, 3, 4, 5].map(value => ({
    label: String(value),
    value,
  }));

  const stressOptions = [1, 2, 3, 4, 5].map(value => ({
    label: String(value),
    value,
  }));

  const workModeOptions = [
    { label: 'Home Office', value: 'home' as WorkMode },
    { label: 'Presencial', value: 'office' as WorkMode },
    { label: 'Híbrido', value: 'hybrid' as WorkMode },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617' }}>
      <LinearGradient
        colors={['#4c1d95', '#7c3aed', '#a855f7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            marginTop: 8,
          }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: 'rgba(15,23,42,0.9)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
              {MOCK_USER_NAME.charAt(0)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#e5e7eb', fontSize: 13 }}>Bem-vindo de volta,</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
              {MOCK_USER_NAME}
            </Text>
            <Text style={{ color: '#e0e7ff', fontSize: 12 }}>{MOCK_USER_ROLE}</Text>
          </View>
        </View>

        {/* 👇 CARD DE RESUMO + GAMIFICAÇÃO */}
        <View
          style={{
            backgroundColor: 'rgba(15,23,42,0.28)',
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: 'rgba(191,219,254,0.25)',
          }}
        >
          <Text
            style={{
              color: '#e0e7ff',
              fontSize: 13,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Saúde mental hoje
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 6,
            }}
          >
            {averageMood
              ? `Humor médio recente: ${averageMood}/5`
              : 'Você ainda não registrou seu dia.'}
          </Text>

          <Text style={{ color: '#c7d2fe', fontSize: 12, marginBottom: 4 }}>
            🧠 MindScore total: {stats.mindScore} XP
          </Text>

          <Text style={{ color: '#c7d2fe', fontSize: 12 }}>
            🔥 Streak: {stats.streak} dia(s) consecutivo(s)
          </Text>
        </View>
      </LinearGradient>

      {/* CONTEÚDO SCROLLÁVEL */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 60,
        }}
      >
        {/* CARD DO FORMULÁRIO */}
        <View
          style={{
            backgroundColor: '#020617',
            borderRadius: 16,
            padding: 16,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#1f2937',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          }}
        >
          <Text
            style={{
              color: '#e5e7eb',
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 14,
            }}
          >
            Registrar novo check-in
          </Text>

          <SelectorRow
            label="Humor (1 = muito ruim, 5 = excelente)"
            options={moodOptions}
            selectedValue={mood}
            onSelect={setMood}
          />

          <SelectorRow
            label="Nível de estresse (1 = tranquilo, 5 = muito alto)"
            options={stressOptions}
            selectedValue={stress}
            onSelect={setStress}
          />

          <SelectorRow
            label="Modo de trabalho"
            options={workModeOptions}
            selectedValue={workMode}
            onSelect={setWorkMode}
          />

          <Text
            style={{
              color: '#d1d5db',
              fontSize: 14,
              marginTop: 8,
              marginBottom: 6,
            }}
          >
            Descreva seu dia em poucas palavras
          </Text>
          <TextInput
            placeholder="Ex: Muitas reuniões, prazo apertado, mas equipe colaborando bem..."
            placeholderTextColor="#6b7280"
            value={note}
            onChangeText={setNote}
            multiline
            style={{
              backgroundColor: '#020617',
              color: 'white',
              borderRadius: 10,
              padding: 12,
              minHeight: 90,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#374151',
            }}
          />

          <TouchableOpacity
            onPress={handleSave}
            style={{
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <LinearGradient
              colors={['#4c1d95', '#7c3aed', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingVertical: 14,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                Salvar check-in
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* HISTÓRICO */}
        <Text
          style={{
            color: '#e5e7eb',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 12,
          }}
        >
          Histórico de bem-estar
        </Text>

        {loading ? (
          <Text style={{ color: '#9ca3af' }}>Carregando registros...</Text>
        ) : entries.length === 0 ? (
          <Text style={{ color: '#9ca3af' }}>
            Nenhum registro ainda. Comece registrando seu primeiro check-in acima. 🙂
          </Text>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <EntryCard entry={item} />}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
