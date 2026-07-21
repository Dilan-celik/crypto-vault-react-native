import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usePortfolio } from '../src/hooks/usePortfolio';

export default function AddAssetModal() {
  const router = useRouter();
  const { id, name, price, image } = useLocalSearchParams();
  const { addAsset } = usePortfolio();
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return Alert.alert("Hata", "Geçersiz miktar");
    addAsset({ id: id as string, name: name as string, current_price: parseFloat(price as string), image: image as string, symbol: '', price_change_percentage_24h: 0 }, num);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name} Ekle</Text>
      <TextInput style={styles.input} placeholder="Miktar" placeholderTextColor="#555" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} autoFocus />
      <TouchableOpacity style={styles.btn} onPress={handleSave}><Text style={{fontWeight:'bold'}}>KAYDET</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 30, justifyContent: 'center' },
  title: { color: 'white', fontSize: 24, textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#111', color: 'white', padding: 20, borderRadius: 15, fontSize: 20, textAlign: 'center', marginBottom: 20 },
  btn: { backgroundColor: '#00ff88', padding: 20, borderRadius: 15, alignItems: 'center' }
});