export class Product {
    productId!: string;
    category!: string;
    picture!: string;
    name!: string;
    description!: string;
    price!: number;
    locations!: {
      locationName: string;
      locationPrice: number;
    }[];
    companyId!: string;
    available!: boolean;
  }
  
  