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
            {/* SOL TARAF: Logo ve İsim */}
            <View style={styles.left}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View style={{ flexShrink: 1 }}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
              </View>
            </View>

            {/* SAĞ TARAF: Fiyat ve Buton */}
            <View style={styles.right}>
              <Text style={styles.price} numberOfLines={1}>${item.current_price.toLocaleString()}</Text>
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
  center: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  coinItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    borderBottomWidth: 0.5, 
    borderBottomColor: '#1a1a1a' 
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 }, // Sol taraf genişleyebilir
  img: { width: 32, height: 32, marginRight: 10 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  symbol: { color: '#666', fontSize: 12 },
  right: { alignItems: 'flex-end', marginLeft: 10 }, // Sağ taraf sabit kalır
  price: { color: 'white', fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  btn: { backgroundColor: '#00ff88', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnText: { color: 'black', fontWeight: 'bold', fontSize: 12 }
});