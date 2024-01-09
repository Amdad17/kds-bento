export interface Order {
    toUpperCase(): unknown;
    id: number;
    customerName: string;
    orderDetails: string;
    chefName: string;
    status: 'pending' | 'preparing' | 'ready' | 'served';
    
  }
  