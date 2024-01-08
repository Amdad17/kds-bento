export interface Order {
    id: number;
    customerName: string;
    orderDetails: string;
    chefName: string;
    status: 'pending' | 'preparing' | 'ready' | 'served';
    
  }
  