// BookForm.js
import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import useApiServices from '../../../services/useApiService';
import { apiRoutes } from '../../../services/apiRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';

const BookForm = ({ addBook, updateBook, editingBook }) => {

  const { apiPost, apiPut } = useApiServices();
  const navigate = useNavigate();
  const location = useLocation();
  const [book,setBook] = useState(location?.state?.book);
  console.log(location);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (book?.title) {
      setFormData(book);
    } else {
      setFormData({
        title: '',
        author: '',
        price: '',
        description: '',
        imageUrl: ''
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(book?.title){
      try {
        const response = await apiPut(`${apiRoutes.BOOK_DATA}${book?._id}` , formData);
        console.log(response);
        if(response){
             setFormData({
              name: '',
              author: '',
              price: '',
              description: '',
              image: ''
            });
            
  
            navigate("/admin/dashboard");
            toast("book updated successfuly")
  
            
        }
      } catch (error) {
        console.log(error);
        return alert(error?.response?.data);
      }
    } else {
      try {
        const response = await apiPost(apiRoutes.BOOK_DATA, formData);
        if(response){
             setFormData({
              name: '',
              author: '',
              price: '',
              description: '',
              image: ''
            });
            toast("book created successfuly")
            navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log(error);
        return alert(error?.response?.data);
      }
    }
    
   
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className={styles.bookForm}>
      <h2>{book?.title ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit} className={styles.formelements}>
        <input type="text" name="title" placeholder="Name" value={formData.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
        <button type="submit">{book?.title ? 'Update' : 'Add'}</button>
      </form>
    </div>
    </>
  );
};

export default BookForm;
