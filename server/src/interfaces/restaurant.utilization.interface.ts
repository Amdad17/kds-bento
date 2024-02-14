export interface RestaurantUtilization {
    restaurantId: number;
    restaurantName:String;
    latitude: Number;
    longitude: Number;
    utilization: Number;
    capacity?: number;
    openingHours?: string;
    address?: string;
    cuisineType?: string;
    rating?: number;
}