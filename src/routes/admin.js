import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/Dashboard/Dashboard';
import BookForm from '../pages/Admin/BookForm/BookForm';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<AdminDashboard />} />
      <Route path='/book/add' element={<BookForm />} />
    </Routes>
  );
};

export default AdminRoutes;
