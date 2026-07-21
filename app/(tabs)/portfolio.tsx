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
        <Text style={{color: '#888'}}>Toplam Varlık Değeri</Text>
        <Text style={styles.total}>${total.toLocaleString()}</Text>
      </View>
      <FlatList
        data={portfolio}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{uri: item.image}} style={{width:30, height:30, marginRight:10}} />
            <View style={{flex:1}}>
              <Text style={{color:'white', fontWeight:'bold'}}>{item.name}</Text>
              <Text style={{color:'#666'}}>{item.amount} Adet</Text>
            </View>
            <TouchableOpacity onPress={() => removeAsset(item.id)}>
              <Text style={{color:'#ff4444'}}>SİL</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { alignItems: 'center', padding: 30, backgroundColor: '#111', borderRadius: 20, marginBottom: 20 },
  total: { color: '#00ff88', fontSize: 35, fontWeight: 'bold', marginTop: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#111', marginBottom: 10, borderRadius: 15, alignItems: 'center' }
});