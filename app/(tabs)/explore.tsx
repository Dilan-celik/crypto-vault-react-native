import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCrypto } from '../../src/hooks/useCrypto';
import { Coin } from '../../src/types/crypto';

export default function ExploreScreen() {
  const { coins } = useCrypto();

  // En çok artan 5 coin
  const gainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  // En çok düşen 5 coin
  const losers = [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  const renderCoinSmall = (item: Coin) => (
    <View key={item.id} style={styles.coinCard}>
      <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
      <Text style={[styles.coinChange, { color: item.price_change_percentage_24h > 0 ? '#00ff88' : '#ff4444' }]}>
        {item.price_change_percentage_24h.toFixed(2)}%
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Günün En Çok Artanları</Text>
      <View style={styles.row}>
        {gainers.map(renderCoinSmall)}
      </View>

      <Text style={[styles.title, { marginTop: 30 }]}>Günün En Çok Düşenleri</Text>
      <View style={styles.row}>
        {losers.map(renderCoinSmall)}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>🔍 İpucu: Piyasalar çok hareketli olduğunda bu listeyi kontrol etmeyi unutma!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  coinCard: { backgroundColor: '#111', padding: 15, borderRadius: 12, width: '30%', alignItems: 'center' },
  coinSymbol: { color: 'white', fontWeight: 'bold' },
  coinChange: { fontSize: 12, marginTop: 5 },
  infoBox: { marginTop: 40, padding: 20, backgroundColor: '#1a1a1a', borderRadius: 15 },
  infoText: { color: '#888', fontStyle: 'italic', textAlign: 'center' }
});