import { Ionicons } from '@expo/vector-icons'; // Standart ikonlar daha güvenlidir
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Alt barı siyah yapalım ki projemize uysun
        tabBarStyle: { backgroundColor: '#121212', borderTopWidth: 0 },
        tabBarActiveTintColor: '#00ff88', // Aktif sekme neon yeşil
        tabBarInactiveTintColor: '#888',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        headerShown: true, // Başlıklar görünsün
      }}>
      
      {/* 1. SEKME: PİYASALAR */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Piyasalar',
          tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={24} color={color} />,
        }}
      />

      {/* 2. SEKME: KEŞFET (EXPLORE) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />

      {/* 3. SEKME: PORTFÖYÜM */}
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portföyüm',
          tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}