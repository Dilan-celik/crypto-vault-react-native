import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usePortfolio } from '../src/hooks/usePortfolio';

export default function AddAssetModal() {
  const router = useRouter();
  const { id, name, price, image } = useLocalSearchParams(); // Seçilen coinin bilgilerini alıyoruz
  const { addAsset } = usePortfolio();
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("Hata", "Lütfen geçerli bir miktar girin.");
      return;
    }

    // Seçilen coini portföye ekle
    addAsset({
      id: id as string,
      name: name as string,
      current_price: parseFloat(price as string),
      image: image as string,
      symbol: '', // Diğer alanları opsiyonel bırakabilirsin
      price_change_percentage_24h: 0
    }, numAmount);

    Alert.alert("Başarılı", `${name} portföyünüze eklendi.`);
    router.back(); // Modalı kapat
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name} Satın Al</Text>
      <Text style={styles.label}>Miktar (Adet)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 0.5"
        placeholderTextColor="#555"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Portföye Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center' },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  label: { color: '#888', marginBottom: 10 },
  input: { backgroundColor: '#111', color: 'white', padding: 15, borderRadius: 10, fontSize: 18, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
  button: { backgroundColor: '#00ff88', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});