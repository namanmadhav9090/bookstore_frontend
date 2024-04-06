// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import BookList from '../Booklist/BookList';
import BookForm from '../BookForm/BookForm';
import { useNavigate } from "react-router-dom";
import styles from './style.module.css';
import useApiServices from '../../../services/useApiService';
import { apiRoutes } from '../../../services/apiRoutes';
import Navbar from '../../../components/navbar/Navbar';

const AdminDashboard = () => {
  const { apiGet } = useApiServices();
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const response = await  apiGet(apiRoutes.BOOK_DATA);
        setBooks(response);
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
     
    };
    
    fetchBooks();
  }, []);

  const addBook = (newBook) => {
    // Add new book to the list
    setBooks([...books, newBook]);
  };

  const editBook = (book) => {
    // Set the book to be edited
    setEditingBook(book);
  };

  const updateBook = (updatedBook) => {
    // Update the book in the list
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    // Delete the book from the list
    setBooks(books.filter(book => book.id !== id));
  };

  

  return (
    <>
      <Navbar />
      <div className={styles.adminDashboard}>
      
      <div onClick={()=> navigate('/admin/book/add')} className={styles.addbtn}>
        <button>Add Book +</button>
      </div>
      <div className={styles.bookscontainer}>
        <BookList books={books} />
      </div>      {/* <BookForm addBook={addBook} updateBook={updateBook} editingBook={editingBook} /> */}
    </div>
    </>
  );
};

export default AdminDashboard;
