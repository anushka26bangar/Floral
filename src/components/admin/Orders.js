import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Fetch orders on component mount
    useEffect(() => {
        axios.get('/api/orders') // Adjust the endpoint based on your backend setup
            .then(response => {
                setOrders(response.data);
                setFilteredOrders(response.data);
            })
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    // Filter orders based on search input or status filter
    useEffect(() => {
        setFilteredOrders(
            orders.filter(order =>
                (order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                order.order_id.toString().includes(search)) &&
                (statusFilter ? order.status === statusFilter : true)
            )
        );
    }, [search, statusFilter, orders]);

    return (
        <div className="order-page">
            <h1>Order Management</h1>

            {/* Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by Order ID or Customer"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            {/* Orders Table */}
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.customer_name}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>${order.total_amount.toFixed(2)}</td>
                            <td>
                                <button onClick={() => setSelectedOrder(order)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Order Details</h2>
                        <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                        <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                        <p><strong>Total Amount:</strong> ${selectedOrder.total_amount.toFixed(2)}</p>
                        <h3>Items</h3>
                        <ul>
                            {selectedOrder.items.map((item, index) => (
                                <li key={index}>{item.product_name} - {item.quantity} @ ${item.price}</li>
                            ))}
                        </ul>
                        <button onClick={() => setSelectedOrder(null)}>Close</button>
                    </div>
                </div>
            )}
            <style jsx>{`
                .order-page {
                    padding: 20px;
                }

                .filters {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 15px;
                }

                .order-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .order-table th, .order-table td {
                    padding: 10px;
                    border: 1px solid #ccc;
                    text-align: left;
                }

                .order-table th {
                    background-color: #f0f0f0;
                }

                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(0, 0, 0, 0.5);
                }

                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    width: 80%;
                    max-width: 500px;
                }

                .modal-content h3 {
                    margin-top: 15px;
                }
            `}</style>
        </div>
    );
}

export default Orders;
