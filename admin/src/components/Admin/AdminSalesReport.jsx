// components/AdminSalesReport.js
import React, { useState, useEffect } from 'react';

const AdminSalesReport = () => {
  const [report, setReport] = useState({
    totalProductCount: 0,
    totalSalesAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/sales-report');
        const data = await response.json();
        setReport(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales report:', error);
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Sales Report</h1>
      <div className="mb-4">
        <p>Total Product Count: <strong>{report.totalProductCount}</strong></p>
        <p>Total Sales Amount: <strong>Rs {report.totalSalesAmount}.00</strong></p>
      </div>
    </div>
  );
};

export default AdminSalesReport;
