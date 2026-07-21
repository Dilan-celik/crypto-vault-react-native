import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePortfolio } from '../../src/hooks/usePortfolio';

export default function PortfolioScreen() {
  const { portfolio, removeAsset, refreshPortfolio } = usePortfolio();

  useFocusEffect(useCallback(() => { refreshPortfolio(); }, []));

  const total = portfolio.reduce((sum, item) => sum + (item.current_price * item.amount), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: '#888', fontSize: 16 }}>Toplam Portföy Değeri</Text>
        <Text style={styles.total}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
      </View>
      <FlatList
        data={portfolio}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={{ width: 30, height: 30, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={{ color: '#888' }}>{item.amount} Adet</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.price}>${(item.current_price * item.amount).toLocaleString()}</Text>
              <TouchableOpacity onPress={() => removeAsset(item.id)}>
                <Text style={{ color: '#ff4444', marginTop: 5, fontSize: 12 }}>SİL</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { alignItems: 'center', marginVertical: 30, backgroundColor: '#111', padding: 20, borderRadius: 15 },
  total: { color: '#00ff88', fontSize: 32, fontWeight: 'bold', marginTop: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#111', marginBottom: 10, borderRadius: 12, alignItems: 'center' },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  price: { color: 'white', fontWeight: 'bold' }
});
