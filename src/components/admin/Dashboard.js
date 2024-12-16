// Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    recentActivities: [],
  });

  useEffect(() => {
    // Fetch dashboard metrics from the backend
    axios.get('/api/dashboard/overview')
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Dashboard</h2>
      <div style={styles.metricsContainer}>
        <div style={styles.metricBox}>
          <h3>Total Sales</h3>
          <p>${stats.totalSales}</p>
        </div>
        <div style={styles.metricBox}>
          <h3>Pending Orders</h3>
          <p>{stats.pendingOrders}</p>
        </div>
        <div style={styles.metricBox}>
          <h3>Low Stock Products</h3>
          <p>{stats.lowStockProducts}</p>
        </div>
      </div>
      <div style={styles.activityContainer}>
        <h3>Recent Activities</h3>
        <ul style={styles.activityList}>
          {stats.recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#2a2a2a',
  },
  metricsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0',
  },
  metricBox: {
    width: '150px',
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    textAlign: 'center',
  },
  activityContainer: {
    marginTop: '30px',
  },
  activityList: {
    listStyleType: 'none',
    padding: 0,
    color: '#4a4a4a',
  },
};

export default Dashboard;
