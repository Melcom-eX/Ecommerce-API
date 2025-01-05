export interface SellerResponse {
    id: string;
    businessName: string;
    description?: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    logo?: string;
    rating: number;
    totalSales: number;
    isVerified: boolean;
    createdAt: Date;
  }