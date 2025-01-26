import React, { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, date: "2024-01-15", status: "Delivered", total: 249.99, items: 3 },
    {
      id: 2,
      date: "2024-01-10",
      status: "Processing",
      total: 129.99,
      items: 2,
    },
    { id: 3, date: "2023-12-28", status: "Delivered", total: 89.99, items: 1 },
  ]);
  return (
    <div className="card-body">
      <h2 className="card-title">Recent Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card bg-base-200">
            <div className="card-body p-4 flex-row justify-between items-center">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm opacity-70">{order.date}</p>
                <p className="text-sm">{order.items} items</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${order.total}</p>
                <div
                  className={`badge ${
                    order.status === "Delivered"
                      ? "badge-success"
                      : "badge-info"
                  }`}
                >
                  {order.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
