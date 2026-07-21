import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Alt menü grubunu buraya bağlıyoruz */}
      <Stack.Screen name="(tabs)" />
      
      {/* Modalı ayrı bir katman olarak tanımlıyoruz */}
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