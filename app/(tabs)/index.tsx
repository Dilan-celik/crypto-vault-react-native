import { useRouter } from 'expo-router'; // Yönlendirme için ekledik
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCrypto } from '../../src/hooks/useCrypto';
import { Coin } from '../../src/types/crypto';

export default function MarketScreen() {
  const { coins, loading, refreshing, onRefresh } = useCrypto();
  const router = useRouter(); // Router'ı başlattık

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
            {/* Coin Logosu */}
            <Image source={{ uri: item.image }} style={styles.img} />
            
            {/* İsim ve Fiyat Bilgisi */}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.current_price.toLocaleString()}</Text>
            </View>

            {/* EKLE Butonu - Artık Modal'ı Açıyor */}
            <TouchableOpacity 
              onPress={() => {
                // Modala giderken coinin bilgilerini "params" olarak gönderiyoruz
                router.push({
                  pathname: '/modal',
                  params: { 
                    id: item.id, 
                    name: item.name, 
                    price: item.current_price, 
                    image: item.image 
                  }
                });
              }}
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
  coinItem: { 
    flexDirection: 'row', 
    padding: 15, 
    alignItems: 'center', 
    borderBottomWidth: 0.5, 
    borderBottomColor: '#222' 
  },
  img: { width: 32, height: 32, marginRight: 12 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  price: { color: '#888', fontSize: 14 },
  btn: { 
    backgroundColor: '#00ff88', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 10 
  },
  btnText: { color: 'black', fontWeight: 'bold', fontSize: 13 }
});