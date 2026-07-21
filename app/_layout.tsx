import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarStyle: { backgroundColor: '#121212' }, 
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#00ff88' 
    }}>
      <Tabs.Screen name="index" options={{ title: 'Piyasalar', tabBarIcon: ({color}) => <Ionicons name="stats-chart" size={24} color={color} /> }} />
      <Tabs.Screen name="portfolio" options={{ title: 'Portföyüm', tabBarIcon: ({color}) => <Ionicons name="wallet" size={24} color={color} /> }} />
    </Tabs>
  );
}