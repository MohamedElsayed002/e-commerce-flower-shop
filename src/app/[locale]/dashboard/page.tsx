import { getAllStatistics } from "@/lib/apis/dashboard/statistics.api";

// NOTE: This is just a dummy page.
export default async function Page() {
  const allStat = (await getAllStatistics()) || [];
  const {
    overall: overallStat,
    products: productsStat,
    orders: ordersStat,
    categories: categoriesStat
  } = allStat;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Products", value: overallStat.totalProducts, icon: "📦" },
          { title: "Total Orders", value: overallStat.totalOrders, icon: "📋" },
          { title: "Total Categories", value: overallStat.totalCategories, icon: "🏷️" },
          { title: "Total Revenue", value: formatCurrency(overallStat.totalRevenue), icon: "💰" }
        ].map((stat) => (
          <div key={stat.title} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">🔥 Top Selling Products</h2>
          <div className="space-y-3">
            {productsStat.topSellingProducts.map((product) => (
              <div key={product._id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded">
                {/* <Image
                  src={product.imgCover} 
                  alt={product.title} 
                  className="w-12 h-12 object-cover rounded"
                /> */}
                <div className="flex-1">
                  <h3 className="font-medium">{product.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatCurrency(product.price)}</span>
                    <span>Sold: {product.sold}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">⚠️ Low Stock Products</h2>
          <div className="space-y-3">
            {productsStat.lowStockProducts.map((product) => (
              <div key={product._id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded">
                {/* <Image 
                  src={product.imgCover} 
                  alt={product.title} 
                  className="w-12 h-12 object-cover rounded"
                /> */}
                <div className="flex-1">
                  <h3 className="font-medium">{product.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatCurrency(product.price)}</span>
                    <span className="text-red-500">Stock: {product.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">📂 Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesStat.map((category) => (
            <div key={category._id} className="border p-3 rounded-lg">
              <h3 className="font-medium">{category.name}</h3>
              <div className="mt-2 text-sm">
                <p>Products: {category.totalProducts}</p>
                <p>Revenue: {formatCurrency(category.totalRevenue)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">📅 Daily Revenue</h2>
          <div className="space-y-2">
            {ordersStat.dailyRevenue.map((day) => (
              <div key={day._id} className="flex justify-between p-2 border-b">
                <span>{new Date(day._id).toLocaleDateString()}</span>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(day.revenue)}</p>
                  <p className="text-sm text-gray-500">{day.count} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Monthly Revenue */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">📆 Monthly Revenue</h2>
          <div className="space-y-2">
            {ordersStat.monthlyRevenue.map((month) => (
              <div key={month._id} className="flex justify-between p-2 border-b">
                <span>{new Date(month._id).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(month.revenue)}</p>
                  <p className="text-sm text-gray-500">{month.count} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">📊 Order Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {ordersStat.ordersByStatus.map((status) => (
            <div key={status._id || 'unknown'} className="text-center p-3 border rounded">
              <p className="font-medium capitalize">{status._id || 'Unknown'}</p>
              <p className="text-2xl">{status.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products by Category */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">🗂️ Products by Category</h2>
        <div className="space-y-4">
          {productsStat.productsByCategory.map((category) => (
            <div key={category._id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium capitalize">{category.category}</h3>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {category.count} products
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {category.products.slice(0, 3).map((product) => (
                  <div key={product._id} className="border p-2 rounded">
                    <img 
                      src={product.imgCover} 
                      alt={product.title} 
                      className="w-full h-20 object-cover rounded mb-1"
                    />
                    <h4 className="text-sm font-medium truncate">{product.title}</h4>
                    <p className="text-xs">{formatCurrency(product.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
