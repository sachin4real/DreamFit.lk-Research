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
    <div className="admin-sales-report">
      <h1 className="title">Admin Sales Report</h1>
      <div className="report-details">
        <p>Total Product Count: <strong>{report.totalProductCount}</strong></p>
        <p>Total Sales Amount: <strong>Rs {report.totalSalesAmount}.00</strong></p>
      </div>

      <style>{`
        .admin-sales-report {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .report-details p {
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .report-details strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AdminSalesReport;
