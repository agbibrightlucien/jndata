import React from 'react';

const Dashboard = () => {
  // Dummy data for the dashboard
  const metrics = {
    totalProfit: 'GH₵15,234.50',
    customerOrders: 156,
    mobileMoneyStats: {
      mtnMomo: 'GH₵8,450',
      vodafoneCash: 'GH₵4,234',
      airtelTigo: 'GH₵2,550'
    }
  };

  const subVendors = [
    { id: 1, name: 'Kwame Mensah', orders: 45, profit: 'GH₵2,345' },
    { id: 2, name: 'Abena Osei', orders: 32, profit: 'GH₵1,890' },
    { id: 3, name: 'Kofi Addo', orders: 28, profit: 'GH₵1,670' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Profit Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Profit</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalProfit}</p>
        </div>

        {/* Customer Orders Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Customer Orders</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.customerOrders}</p>
        </div>

        {/* Mobile Money Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Mobile Money Revenue</h3>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">MTN MoMo</span>
              <span className="font-semibold">{metrics.mobileMoneyStats.mtnMomo}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Vodafone Cash</span>
              <span className="font-semibold">{metrics.mobileMoneyStats.vodafoneCash}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">AirtelTigo Money</span>
              <span className="font-semibold">{metrics.mobileMoneyStats.airtelTigo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-vendors Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Sub-vendors</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subVendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;