import React, { useState } from 'react';

const OrderTracker = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrderStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/orders/status/${orderId}`);
      if (!response.ok) throw new Error('Order not found');
      const data = await response.json();
      setStatus(data.status);
    } catch (err) {
      setError(err.message);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <div className="space-y-4">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchOrderStatus}
          disabled={loading || !orderId}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Track Status'}
        </button>
        {status && (
          <div className="mt-4 p-4 rounded" style={{ backgroundColor: status === 'Pending' ? '#fef3c7' : '#dcfce7' }}>
            <p className="font-medium">Status: {status}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracker;