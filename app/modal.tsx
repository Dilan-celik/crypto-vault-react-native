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
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("Hata", "Lütfen geçerli bir miktar girin.");
      return;
    }
    addAsset({ id: id as string, name: name as string, current_price: parseFloat(price as string), image: image as string, symbol: '', price_change_percentage_24h: 0 }, numAmount);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name} Ekle</Text>
      <TextInput style={styles.input} placeholder="Miktar girin (Örn: 0.5)" placeholderTextColor="#555" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} autoFocus />
      <TouchableOpacity style={styles.btn} onPress={handleSave}><Text style={styles.btnText}>KAYDET</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}><Text style={{ color: '#888', textAlign: 'center' }}>Vazgeç</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 30, justifyContent: 'center' },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#111', color: 'white', padding: 15, borderRadius: 12, fontSize: 18, marginBottom: 20, textAlign: 'center', borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#00ff88', padding: 15, borderRadius: 12, alignItems: 'center' },
  btnText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});