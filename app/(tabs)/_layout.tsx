import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0, height: 60 },
        tabBarActiveTintColor: '#00ff88',
        tabBarInactiveTintColor: '#555',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Piyasalar', tabBarIcon: ({color}) => <Ionicons name="stats-chart" size={24} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Keşfet', tabBarIcon: ({color}) => <Ionicons name="search" size={24} color={color} /> }} />
      <Tabs.Screen name="portfolio" options={{ title: 'Portföyüm', tabBarIcon: ({color}) => <Ionicons name="wallet" size={24} color={color} /> }} />
    </Tabs>
  );
}