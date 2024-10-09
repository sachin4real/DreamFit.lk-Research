import React from 'react';
import AdminLayout from '../components/Layout/AdminLayout';
import AddItem from '../components/Admin/AddItem';
import AllProducts from '../components/Admin/AllProducts';
import ProductDetails from '../components/Admin/ProductDetails';

import EditProduct from '../components/Admin/EditProduct';

import { Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import HomePage from '../components/Admin/homepage';

const AdminPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/edit-products" element={<EditProduct />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPage;
