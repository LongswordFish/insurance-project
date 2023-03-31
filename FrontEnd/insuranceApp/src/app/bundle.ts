export class Bundle {
  bundleid!: string;
  bundlename!: string | null;
  productids: string[] = [];
  totalPrice!: number;
  location!: string;
  companyid!: string;
}
