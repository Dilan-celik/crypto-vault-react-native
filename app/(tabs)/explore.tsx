import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCrypto } from '../../src/hooks/useCrypto';

export default function ExploreScreen() {
  const { coins } = useCrypto();

  const gainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);
  const losers = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5);

  const renderCoin = (item: any) => (
    <View key={item.id} style={styles.card}>
      <Text style={styles.cardSymbol}>{item.symbol.toUpperCase()}</Text>
      <Text style={{ color: item.price_change_percentage_24h > 0 ? '#00ff88' : '#ff4444' }}>
        {item.price_change_percentage_24h?.toFixed(2)}%
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚀 Günün En Çok Artanları</Text>
      <View style={styles.row}>{gainers.map(renderCoin)}</View>
      <Text style={[styles.title, { marginTop: 30 }]}>🔻 Günün En Çok Düşenleri</Text>
      <View style={styles.row}>{losers.map(renderCoin)}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: { backgroundColor: '#111', padding: 15, borderRadius: 12, width: '30%', alignItems: 'center' },
  cardSymbol: { color: 'white', fontWeight: 'bold', marginBottom: 5 }
});