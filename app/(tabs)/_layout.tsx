import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Ana sekmeleri tek bir grup olarak görüyoruz */}
      <Stack.Screen name="(tabs)" />
      
      {/* Modal'ı ayrı bir ekran olarak tanımlıyoruz */}
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'modal', 
          headerShown: true,
          headerTitle: 'Varlık Ekle',
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#fff'
        }} 
      />
    </Stack>
  );
}