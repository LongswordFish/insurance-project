// Product Model Definition
export interface Product {
    productId: string;
    category: string;
    picture: string;
    name: string;
    description: string;
    price: number;
    locations: Location[];
    companyId: string;
    available: boolean;
  }
  
  // Location as an embedded model Definition
  export interface Location {
    locationName: string;
    locationPrice: number;
  }