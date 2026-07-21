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
        <Text style={styles.headerLabel}>Toplam Varlık Değeri</Text>
        <Text style={styles.totalText}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
      </View>
      <FlatList
        data={portfolio}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImg} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>{item.amount} Adet</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.itemPrice}>${(item.current_price * item.amount).toLocaleString()}</Text>
              <TouchableOpacity onPress={() => removeAsset(item.id)}><Text style={styles.delete}>SİL</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { alignItems: 'center', padding: 30, backgroundColor: '#111', borderRadius: 20, marginBottom: 20 },
  headerLabel: { color: '#888', fontSize: 14 },
  totalText: { color: '#00ff88', fontSize: 32, fontWeight: 'bold', marginTop: 10 },
  item: { flexDirection: 'row', padding: 15, backgroundColor: '#111', marginBottom: 10, borderRadius: 15, alignItems: 'center' },
  itemImg: { width: 30, height: 30, marginRight: 10 },
  itemName: { color: 'white', fontWeight: 'bold' },
  itemAmount: { color: '#888', fontSize: 12 },
  itemPrice: { color: 'white', fontWeight: 'bold' },
  delete: { color: '#ff4444', fontSize: 12, marginTop: 5 }
});