import { useEffect, useState } from 'react';
import { fetchMarketData } from '../services/cryptoApi';
import { Coin } from '../types/crypto';

export const useCrypto = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadData = async () => {
    const data = await fetchMarketData();
    if (data && Array.isArray(data)) {
      setCoins(data);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return { coins, loading, refreshing, onRefresh };
};