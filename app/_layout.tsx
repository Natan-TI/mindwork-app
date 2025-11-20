import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // tela de login
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }} // nossa área logada com tabs
      />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal' }}
      />
    </Stack>
  );
}
