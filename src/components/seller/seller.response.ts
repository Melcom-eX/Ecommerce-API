export interface SellerResponse {
  id: string;
  businessName: string;
  description: string | null;
  businessAddress: string;
  sellerType: string;
  businessPhone: string;
  businessEmail: string;
  logo?: string | null;
  rating: number;
  totalSales: number;
  isVerified: boolean;
  createdAt: Date;
}
