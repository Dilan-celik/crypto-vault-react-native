export interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

export interface PortfolioItem extends Coin {
  amount: number;
}