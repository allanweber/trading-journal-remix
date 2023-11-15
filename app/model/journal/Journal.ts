export type Journal = {
  id: string;
  name: string;
  description: string;
  currency: string;
  created_at: string;
  initialBalance: number;
  balance: Balance;
};

export type Balance = {
  current: number;
};
