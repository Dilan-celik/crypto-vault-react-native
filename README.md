# 🪙 CryptoVault: Real-Time Portfolio Tracker

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**CryptoVault**, CoinGecko API kullanarak gerçek zamanlı kripto para piyasası takibi yapmanızı ve kişisel portföyünüzü yönetmenizi sağlayan modern bir mobil uygulamadır.

## ✨ Özellikler

- **📈 Canlı Piyasa Verileri:** En popüler 50 kripto paranın fiyatlarını, sembollerini ve günlük değişimlerini anlık olarak listeleyin.
- **🔍 Akıllı Keşfet Sayfası:** Günün "En Çok Artan" ve "En Çok Düşen" coinlerini özel algoritmik sıralama ile görün.
- **💼 Kişisel Portföy:**
  - İstediğiniz coini portföyünüze ekleyin.
  - Varlıklarınızı silin veya miktarını güncelleyin.
  - Toplam portföy değerinizi otomatik hesaplanmış şekilde görün.
- **💾 Kalıcı Veri (Local Storage):** `AsyncStorage` entegrasyonu sayesinde uygulama kapansa bile verileriniz telefonunuzda güvende kalır.
- **🌙 Dark Mode UI:** Göz yormayan, modern ve şık "Dark Theme" arayüz.

## 🛠️ Kullanılan Teknolojiler

- **Framework:** [React Native](https://reactnative.dev/) (Expo SDK 51+)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management:** Custom Hooks (Logic & UI separation)
- **Data Fetching:** Fetch API & CoinGecko Public API
- **Storage:** @react-native-async-storage/async-storage
- **Icons:** @expo/vector-icons (Ionicons)

## 📂 Dosya Yapısı

```text
crypto-vault/
├── app/               # Expo Router - Sayfa yapıları
│   ├── (tabs)/        # Tab Navigation (Market, Explore, Portfolio)
│   └── _layout.tsx    # Kök navigasyon ayarları
├── src/
│   ├── hooks/         # Özel mantıksal fonksiyonlar (useCrypto, usePortfolio)
│   ├── services/      # API istek yönetimi (cryptoApi)
│   └── types/         # TypeScript tip tanımlamaları
└── assets/            # Görsel materyaller
