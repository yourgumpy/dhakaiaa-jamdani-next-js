import React, { useState } from 'react';
import Image from 'next/image';
import { Order } from '../actions';
import { OrderDetailsModal } from './OrderDetailsModal';
import { StatusBadge } from './StatusBadge';
import { StatusDropdown } from './StatusDropdown';

interface OrdersListProps {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: string) => Promise<void>;
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders, onStatusChange }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Date
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              Customer
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              Items
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              Total
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                #{order.id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                {formatDate(order.created_at)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                {(order.Order_info as any).firstName || 'Unknown'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                {order.products.length} items
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                ${order.total.toFixed(2)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                {/* <div className="inline-block md:hidden"> */}
                  <StatusDropdown 
                    currentStatus={order.status} 
                    onStatusChange={(newStatus) => onStatusChange(order.id, newStatus)} 
                  />
                {/* </div> */}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleViewDetails(order)}
                  className="text-indigo-600 hover:text-indigo-900 bg-transparent hover:bg-indigo-50 px-2 py-1 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};