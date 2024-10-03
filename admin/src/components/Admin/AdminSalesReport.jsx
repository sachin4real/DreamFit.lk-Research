import React, { useState, useEffect } from 'react';

const AdminSalesReport = () => {
  const [report, setReport] = useState({
    totalProductCount: 0,
    totalSalesAmount: 0,
    openTicketCount: 0,
    salesByDate: [], // Add salesByDate to the report state
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
      
      {/* Report Boxes */}
      <div className="report-boxes grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="box bg-white p-6 border border-gray-300 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">Total Product Count</h3>
          <p className="text-2xl font-semibold">{report.totalProductCount}</p>
        </div>
        <div className="box bg-white p-6 border border-gray-300 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">Total Sales Amount</h3>
          <p className="text-2xl font-semibold">Rs {report.totalSalesAmount}.00</p>
        </div>
        <div className="box bg-white p-6 border border-gray-300 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">Open Ticket Count</h3>
          <p className="text-2xl font-semibold">{report.openTicketCount}</p>
        </div>
      </div>

      {/* Sales by Date Table */}
      <h2 className="text-xl font-bold mb-4">Sales by Date</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Total Sales (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {report.salesByDate.map((sale) => (
              <tr key={sale._id}>
                <td className="px-4 py-2 border border-gray-300">{sale._id}</td>
                <td className="px-4 py-2 border border-gray-300">{sale.totalSales}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Container using iframe */}
      <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
        <iframe
          style={{
            background: '#FFFFFF',
            border: 'none',
            borderRadius: '2px',
            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            width: '100%',
            height: '500px',
          }}
          src="https://charts.mongodb.com/charts-virtualdressingroom-bgqpjnv/embed/charts?id=54fd9c64-8854-4093-a2db-f11410f6ae27&maxDataAge=3600&theme=light&autoRefresh=true"
          title="MongoDB Sales Chart"
        ></iframe>
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

        .report-boxes {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .box {
          background-color: white;
          padding: 24px;
          border: 1px solid #e5e7eb; /* Tailwind's gray-300 */
          border-radius: 0.375rem; /* Tailwind's rounded-md */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Tailwind's shadow-md */
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }

        th {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default AdminSalesReport;
