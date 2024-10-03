import React, { useState, useEffect } from 'react';

const AdminSalesReport = () => {
  const [report, setReport] = useState({
    totalProductCount: 0,
    totalSalesAmount: 0,
    openTicketCount: 0, // Added open ticket count
  });
  const [loading, setLoading] = useState(true);
  const [chartLoaded, setChartLoaded] = useState(false);

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

  // Load MongoDB Chart script
  useEffect(() => {
    const mongoChartElement = document.getElementById('mongoChart');
    const script = document.createElement('script');

    script.src = "https://charts.mongodb.com/charts-virtualdressingroom-bgqpjnv/embed/charts?id=54fd9c64-8854-4093-a2db-f11410f6ae27&theme=light&autoRefresh=true";
    script.async = true;

    script.onload = () => {
      console.log('Chart script loaded successfully');
      setChartLoaded(true);
    };

    script.onerror = () => {
      console.error('Error loading the chart script');
      setChartLoaded(false);
    };

    if (mongoChartElement) {
      mongoChartElement.appendChild(script);
    }

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (mongoChartElement) {
        mongoChartElement.innerHTML = ''; // Clear previous chart script
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-sales-report">
      <h1 className="title">Admin Sales Report</h1>
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

      {/* Chart Container */}
      <div id="mongoChart" style={{ width: '100%', height: '500px' }}></div>

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
      `}</style>
    </div>
  );
};

export default AdminSalesReport;
