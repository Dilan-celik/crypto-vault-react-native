import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCrypto } from '../../src/hooks/useCrypto';

export default function MarketScreen() {
  const { coins, loading, refreshing, onRefresh } = useCrypto();
  const router = useRouter();

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#00ff88" /></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00ff88" />}
        renderItem={({ item }) => (
          <View style={styles.coinItem}>
            <View style={styles.left}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>${item.current_price.toLocaleString()}</Text>
              <TouchableOpacity 
                onPress={() => router.push({ pathname: '/modal', params: { id: item.id, name: item.name, price: item.current_price, image: item.image } })}
                style={styles.btn}
              >
                <Text style={styles.btnText}>EKLE</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  coinItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#222', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center' },
  img: { width: 32, height: 32, marginRight: 12 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  symbol: { color: '#888', fontSize: 12 },
  right: { alignItems: 'flex-end' },
  price: { color: 'white', fontWeight: 'bold', marginBottom: 5 },
  btn: { backgroundColor: '#00ff88', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnText: { color: 'black', fontWeight: 'bold', fontSize: 12 }
});