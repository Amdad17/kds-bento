export interface IOrder {
  id: string; 
  items: { name: string, qty: number, preparetime: number }[];
  type: 'delivery' | 'in-house';
  vip: boolean;
  createdAt: Date;
  course?: string;
  riderArrivalTime?: number;
}