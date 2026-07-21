import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCrypto } from '../../src/hooks/useCrypto';

export default function ExploreScreen() {
  const { coins } = useCrypto();
  const gainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 6);
  const losers = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 6);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚀 En Çok Artanlar</Text>
      <View style={styles.row}>
        {gainers.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardSymbol}>{item.symbol.toUpperCase()}</Text>
            <Text style={{color:'#00ff88'}}>%{item.price_change_percentage_24h.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <Text style={[styles.title, {marginTop:30}]}>🔻 En Çok Düşenler</Text>
      <View style={styles.row}>
        {losers.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardSymbol}>{item.symbol.toUpperCase()}</Text>
            <Text style={{color:'#ff4444'}}>%{item.price_change_percentage_24h.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { backgroundColor: '#111', padding: 15, borderRadius: 15, width: '30%', alignItems: 'center' },
  cardSymbol: { color: 'white', fontWeight: 'bold', marginBottom: 5 }
});