export class Product {
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
  isAvailable!: boolean;
}
