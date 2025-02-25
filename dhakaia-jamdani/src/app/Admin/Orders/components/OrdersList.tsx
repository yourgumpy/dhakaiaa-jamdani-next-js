import React, { useState } from 'react';
import Image from 'next/image';
import { Order } from '../actions';
import {OrderDetailsModal} from './OrderDetailsModal';
import {StatusBadge} from './StatusBadge';
import {StatusDropdown} from './StatusDropdown';

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
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover">
              <td>#{order.id}</td>
              <td>{formatDate(order.created_at)}</td>
              <td>{order.user_details?.name || 'Unknown'}</td>
              <td>{order.products.length} items</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <StatusDropdown 
                  currentStatus={order.status} 
                  onStatusChange={(newStatus) => onStatusChange(order.id, newStatus)} 
                />
              </td>
              <td>
                <button 
                  className="btn btn-sm btn-primary" 
                  onClick={() => handleViewDetails(order)}
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