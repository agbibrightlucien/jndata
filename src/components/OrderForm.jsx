import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerAPI } from '../services/api';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^0[235][0-9]{8}$/, 'Please enter a valid Ghanaian phone number')
    .required('Phone number is required'),
  network: yup.string().required('Please select a network'),
  dataPackage: yup.string().required('Please select a data package'),
  paymentMethod: yup.string().required('Please select a payment method')
});

const networks = [
  { id: 'mtn', name: 'MTN', color: 'bg-yellow-500' },
  { id: 'vodafone', name: 'Vodafone', color: 'bg-red-500' },
  { id: 'airteltigo', name: 'AirtelTigo', color: 'bg-blue-500' }
];

const dataPackages = [
  { id: '1gb', name: '1GB', price: 10 },
  { id: '3gb', name: '3GB', price: 25 },
  { id: '5gb', name: '5GB', price: 35 },
  { id: '10gb', name: '10GB', price: 60 }
];

const paymentMethods = [
  { id: 'mtn-momo', name: 'MTN Mobile Money' },
  { id: 'vodafone-cash', name: 'Vodafone Cash' },
  { id: 'airteltigo-money', name: 'AirtelTigo Money' }
];

export default function OrderForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      
      // Submit order to backend
      const response = await customerAPI.placeOrder({
        ...data,
        packageId: selectedPackage?.id,
        amount: selectedPackage?.price
      });

      // Show success message
      alert(`Order submitted successfully! Order ID: ${response.data.order.id}`);
      reset();
      setSelectedPackage(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to submit order';
      alert('Error: ' + errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Data Bundle</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Phone Number
          </label>
          <input
            type="tel"
            {...register('phoneNumber')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Network Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Network
          </label>
          <div className="grid grid-cols-3 gap-3">
            {networks.map((network) => (
              <label
                key={network.id}
                className="relative flex items-center justify-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  {...register('network')}
                  value={network.id}
                  className="sr-only"
                />
                <span className="flex items-center">
                  <span
                    className={`w-3 h-3 ${network.color} rounded-full mr-2`}
                  />
                  {network.name}
                </span>
              </label>
            ))}
          </div>
          {errors.network && (
            <p className="mt-1 text-sm text-red-600">{errors.network.message}</p>
          )}
        </div>

        {/* Data Package Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Data Package
          </label>
          <div className="grid grid-cols-2 gap-3">
            {dataPackages.map((pkg) => (
              <label
                key={pkg.id}
                className="relative flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  {...register('dataPackage')}
                  value={pkg.id}
                  onChange={() => setSelectedPackage(pkg)}
                  className="sr-only"
                />
                <span className="flex flex-col">
                  <span className="font-medium">{pkg.name}</span>
                  <span className="text-sm text-gray-500">GH₵{pkg.price}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.dataPackage && (
            <p className="mt-1 text-sm text-red-600">{errors.dataPackage.message}</p>
          )}
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Payment Method
          </label>
          <select
            {...register('paymentMethod')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select payment method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
          )}
        </div>

        {/* Total Amount */}
        {selectedPackage && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="text-lg font-bold">GH₵{selectedPackage.price}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}