// BookStore.jsx
import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import useApiServices from '../../../services/useApiService';
import { apiRoutes } from '../../../services/apiRoutes';
import BookList from '../../Admin/Booklist/BookList';
import Navbar from '../../../components/navbar/Navbar';



const BookStore = () => {

    const { apiGet } = useApiServices();
    const [books,setBooks] = useState([]);
    const [searchVal,setSearchVal] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent form submission
      
      try {
        const response = await apiGet(`${apiRoutes.SEARCH_BOOK}?query=${searchVal}`);
        console.log(response);
        setBooks(response); // Update book list with search results
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    };

    useEffect(() => {

        const fetchBooks = async () => {
          try {
            const response = await  apiGet(apiRoutes.BOOK_DATA);
        
            setBooks(response);
          } catch (error) {
            console.log(error);
            // alert(error?.response?.data?.message);
          }
         
        };
        
        fetchBooks();
      }, []);


  return (
   <>
      <Navbar />
      <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <input type="text" placeholder="Search books..."
         value={searchVal}
         className={styles.searchinput}
         onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className={styles.searchbtn} type="submit">Search</button>
      </form>
      
      <div className={styles.bookscontainer}>
        <BookList books={books} />
      </div>
    </div>
   </>
  );
};

export default BookStore;
