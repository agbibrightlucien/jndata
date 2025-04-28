import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [subVendors, setSubVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('vendorToken');
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await axios.get('/api/vendors/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setMetrics(response.data.metrics);
        setSubVendors(response.data.subVendors);
        setError('');
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Profit Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Profit</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics?.totalProfit || 'GH₵0.00'}</p>
        </div>

        {/* Customer Orders Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Customer Orders</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics?.customerOrders || 0}</p>
        </div>

        {/* Mobile Money Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Mobile Money Revenue</h3>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">MTN MoMo</span>
              <span className="font-semibold">{metrics?.mobileMoneyStats?.mtnMomo || 'GH₵0.00'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Vodafone Cash</span>
              <span className="font-semibold">{metrics?.mobileMoneyStats?.vodafoneCash || 'GH₵0.00'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">AirtelTigo Money</span>
              <span className="font-semibold">{metrics?.mobileMoneyStats?.airtelTigo || 'GH₵0.00'}</span>
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
                {subVendors.length > 0 ? (
                  subVendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.orders}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.profit}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                      No sub-vendors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;