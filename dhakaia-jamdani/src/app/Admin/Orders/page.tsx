// app/admin/orders/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus, Order } from './actions';
import { OrdersList } from './components/OrdersList';
import { OrdersFilters } from './components/OrdersFilters';

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ status?: string; dateRange?: string }>({});

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
        // console.log(data);
        setFilteredOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      // Update the local state
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      
      setOrders(updatedOrders);
      applyFilters(updatedOrders, filters);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const applyFilters = (ordersList: Order[], activeFilters: { status?: string; dateRange?: string }) => {
    let result = [...ordersList];
    
    // Apply status filter
    if (activeFilters.status) {
      result = result.filter(order => 
        order.status.toLowerCase() === activeFilters.status?.toLowerCase()
      );
    }
    
    // Apply date range filter
    if (activeFilters.dateRange) {
      const now = new Date();
      let startDate: Date;
      
      switch (activeFilters.dateRange) {
        case 'Today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'Last 7 Days':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'Last 30 Days':
          startDate = new Date(now.setDate(now.getDate() - 30));
          break;
        default:
          startDate = new Date(0); // All time
      }
      
      result = result.filter(order => 
        new Date(order.created_at) >= startDate
      );
    }
    
    setFilteredOrders(result);
  };

  const handleFilterChange = (newFilters: { status?: string; dateRange?: string }) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    applyFilters(orders, updatedFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="p-4 pt-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <p className="text-sm opacity-70">Manage customer orders and update their status</p>
      </div>

      <OrdersFilters onFilterChange={handleFilterChange} />
      
      {filteredOrders.length === 0 ? (
        <div className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>No orders found with the selected filters.</span>
        </div>
      ) : (
        <OrdersList 
          orders={filteredOrders} 
          onStatusChange={handleStatusChange} 
        />
      )}
    </div>
  );
}