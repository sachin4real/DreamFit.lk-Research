import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AdminSalesReport = () => {
  const [report, setReport] = useState({
    totalProductCount: 0,
    totalSalesAmount: 0,
    openTicketCount: 0,
    salesByDate: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Function to handle PDF download of the entire page
  const handleDownloadPDF = async () => {
    const input = document.getElementById('report-content');
  
    if (!input) {
      console.error('Report content not found');
      return;
    }
  
    try {
      const canvas = await html2canvas(input, { scale: 2, ignoreElements: (element) => element.tagName === 'IFRAME' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
  
      // Add the image to the PDF
      const imgWidth = 290;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('AdminSalesReport.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  
  

  // Function to download table data as CSV
  const handleDownloadCSV = () => {
    const csvRows = [
      ['Date', 'Total Sales (Rs)', 'Profit (Rs)'],
      ...report.salesByDate.map((sale) => [
        sale._id,
        sale.totalSales + '.00',
        (sale.totalSales * 0.40).toFixed(2),
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SalesReport.csv');
    document.body.appendChild(link);
    link.click();
  };

  // Filter the sales by the search term
  const filteredSales = report.salesByDate.filter((sale) =>
    sale._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="report-content" className="admin-sales-report">
      <h1 className="title">Admin Sales Report</h1>

      {/* Report Boxes */}
      <div className="report-boxes grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="box bg-blue-100 text-blue-700 p-6 border border-blue-300 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">Total Product Count</h3>
          <p className="text-2xl font-semibold">{report.totalProductCount}</p>
        </div>
        <div className="box bg-green-100 text-green-700 p-6 border border-green-300 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">Total Sales Amount</h3>
          <p className="text-2xl font-semibold">Rs {report.totalSalesAmount}.00</p>
        </div>
        <div className="box bg-red-100 text-red-700 p-6 border border-red-300 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">Open Ticket Count</h3>
          <p className="text-2xl font-semibold">{report.openTicketCount}</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Search by date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sales by Date Table */}
      <h2 className="text-xl font-bold mb-4">Sales by Date</h2>
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Total Sales (Rs)</th>
              <th className="px-4 py-2 border border-gray-300">Profit (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale._id}>
                <td className="px-4 py-2 border border-gray-300">{sale._id}</td>
                <td className="px-4 py-2 border border-gray-300">{sale.totalSales}.00</td>
                <td className="px-4 py-2 border border-gray-300">{(sale.totalSales * 0.40).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MongoDB Charts */}
      <div className="charts flex justify-between mb-8">
        <iframe
          style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-virtualdressingroom-bgqpjnv/embed/charts?id=54fd9c64-8854-4093-a2db-f11410f6ae27&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
        <iframe
          style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-virtualdressingroom-bgqpjnv/embed/charts?id=37b48b20-5ef0-45e4-9495-5618bd80afd5&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
        <iframe
          style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-virtualdressingroom-bgqpjnv/embed/charts?id=267b4bc7-1c5b-4b2e-9db5-1d2274412dfb&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
      </div>

      {/* Buttons to Download */}
      <button
        className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white hover:from-teal-500 hover:to-cyan-600 shadow-md mr-4"
        onClick={handleDownloadPDF}
      >
        Download Page as PDF
      </button>
      <button
        className="px-4 py-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg text-white hover:from-indigo-500 hover:to-purple-600 shadow-md"
        onClick={handleDownloadCSV}
      >
        Download Table as CSV
      </button>

      <style>{`
        .admin-sales-report {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .title {
          font-size: 2.5rem;
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
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .charts {
          display: flex;
          justify-content: space-between;
          gap: 16px; /* Optional: Adds space between iframes */
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border: 1px solid #e5e7eb;
        }

        th {
          background-color: #f9fafb;
          font-weight: bold;
        }

        th, td {
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
};

export default AdminSalesReport;
