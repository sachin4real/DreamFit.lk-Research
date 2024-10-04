import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { saveAs } from 'file-saver';

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory/report`, {
        responseType: 'blob', // Blob response type for file download
      });

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `inventory_report_${new Date().toISOString()}.csv`);
    } catch (error) {
      console.error('Error downloading inventory report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Welcome to Inventory Management
      </Typography>

      <Box sx={{ marginTop: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadReport}
            sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
          >
            Download Inventory Report
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
