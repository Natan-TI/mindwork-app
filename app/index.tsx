import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

const MOCK_EMAIL = 'colaborador@mindwork.com';
const MOCK_PASSWORD = '123456';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Ops', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      if (
        email.trim().toLowerCase() === MOCK_EMAIL &&
        password === MOCK_PASSWORD
      ) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Credenciais inválidas', 'Verifique e-mail e senha.');
      }
    }, 600);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#6366f1',
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            MindWork
          </Text>
          <Text
            style={{
              color: '#e5e7eb',
              fontSize: 26,
              fontWeight: '700',
              marginBottom: 4,
            }}
          >
            Bem-vindo de volta 👋
          </Text>
          <Text
            style={{
              color: '#9ca3af',
              fontSize: 14,
              marginBottom: 24,
            }}
          >
            Acesse sua conta para registrar como está seu bem-estar no trabalho.
          </Text>

          <Text style={{ color: '#d1d5db', marginBottom: 4 }}>E-mail</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="seu.email@empresa.com"
            placeholderTextColor="#6b7280"
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: '#020617',
              borderWidth: 1,
              borderColor: '#374151',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              color: '#f9fafb',
              marginBottom: 12,
            }}
          />

          <Text style={{ color: '#d1d5db', marginBottom: 4 }}>Senha</Text>
          <TextInput
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#6b7280"
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: '#020617',
              borderWidth: 1,
              borderColor: '#374151',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              color: '#f9fafb',
              marginBottom: 16,
            }}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            style={{
              backgroundColor: loading ? '#4f46e5aa' : '#4f46e5',
              paddingVertical: 12,
              borderRadius: 999,
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#f9fafb',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>
            Use as credenciais de teste:{'\n'}
            E-mail: {MOCK_EMAIL}{'\n'}
            Senha: {MOCK_PASSWORD}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
