import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Coin, PortfolioItem } from '../types/crypto';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const loadPortfolio = async () => {
    const saved = await AsyncStorage.getItem('@portfolio');
    if (saved) setPortfolio(JSON.parse(saved));
  };

  const addAsset = async (coin: Coin, amount: number) => {
    let newPortfolio = [...portfolio];
    const index = newPortfolio.findIndex(item => item.id === coin.id);
    if (index > -1) {
      newPortfolio[index].amount += amount;
    } else {
      newPortfolio.push({ ...coin, amount });
    }
    setPortfolio(newPortfolio);
    await AsyncStorage.setItem('@portfolio', JSON.stringify(newPortfolio));
  };

  const removeAsset = async (id: string) => {
    const newPortfolio = portfolio.filter(item => item.id !== id);
    setPortfolio(newPortfolio);
    await AsyncStorage.setItem('@portfolio', JSON.stringify(newPortfolio));
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  return { portfolio, addAsset, removeAsset, refreshPortfolio: loadPortfolio };
};