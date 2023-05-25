export interface Nft {
  id: number;
  title: string;
  last_bid?: number;
  price: number;
  creator?: string;
  avatar?: string;
  instant_price?: number;
  ending_in?: string;
  image: string;
}

export interface Campaign {
  createdAt: number;
  name: string;
  industry?: number;
  price: number;
  creator?: string;
  avatar?: string;
  instant_price?: number;
  ending_in?: string;
  image: string;
  last_bid?: string;
  status?: boolean;
  type?: string;
  published?: string;
  icon?:string;
  file?: string;
  details?:{
    description?: string;
    industry?: string;
    name?: string;
    tags?: string;
    };
  budget?:{
    balance?: number;
    dailyBudget?: number;
    totalBudget: number;
    payout?: number;
  }
}
