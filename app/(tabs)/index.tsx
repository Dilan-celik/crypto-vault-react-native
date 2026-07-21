import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCrypto } from '../../src/hooks/useCrypto';
import { usePortfolio } from '../../src/hooks/usePortfolio';
import { Coin } from '../../src/types/crypto';

export default function MarketScreen() {
  const { coins, loading, refreshing, onRefresh } = useCrypto();
  const { addAsset } = usePortfolio();

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color="#00ff88" /></View>
  );

  return (
    <View style={styles.container}>
      <FlatList<Coin>
        data={coins}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00ff88" />}
        renderItem={({ item }) => (
          <View style={styles.coinItem}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.current_price.toLocaleString()}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => { addAsset(item, 1); Alert.alert("Başarılı", `${item.name} eklendi`); }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>EKLE</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  coinItem: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#222' },
  img: { width: 32, height: 32, marginRight: 12 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  price: { color: '#888', fontSize: 14 },
  btn: { backgroundColor: '#00ff88', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 8 },
  btnText: { color: 'black', fontWeight: 'bold' }
});