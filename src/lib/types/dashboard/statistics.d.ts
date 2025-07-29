declare type StatisticsResponse = {
  message: string;
  statistics: {
    overall: OverallStatistics;
    products: ProductsStatistics;
    orders: OrdersStatistics;
    categories: CategoryStats[];
  };
};

declare type OverallStatistics = {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
};

declare type ProductList = {
  title: string;
  price: number;
  imgCover: string;
  quantity?: number;
  sold?: number;
} & DatabaseFields;

declare type ProductcreationResponse ={
  message:'string';
  Products :{
  title: string;
  description: string;
  quantity: number;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  category: string; 
  occasion: string; 
  imgCover: File; 
  images: File[];
  }
}

declare type ProductsByCategory = {
  _id: string;
  count: number;
  category: string;
  products: ProductList[];
};

declare type TopSellingProduct = ProductList & {
  sold: number;
};

declare type LowStockProduct = ProductList & {
  quantity: number;
};

declare type ProductsStatistics = {
  productsByCategory: ProductsByCategory[];
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
};

declare type RevenueEntry = {
  _id: string;
  revenue: number;
  count: number;
};

declare type DailyRevenue = RevenueEntry;
declare type MonthlyRevenue = RevenueEntry;

declare type OrderStatusCount = {
  _id: string | null;
  count: number;
};

declare type OrdersStatistics = {
  ordersByStatus: OrderStatusCount[];
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
};

declare type OrderStatisticsResponse = {
  statistics: OrdersStatistics
}

declare type CategoryStatistics = {
  metadata : Metadata
  categories: Category[]
}
