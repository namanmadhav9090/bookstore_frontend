// BookItem.js

import React from 'react';

import { useNavigate } from "react-router-dom";
import styles from './style.module.css';

const BookItem = ({ book, editBook, deleteBook }) => {
  // console.log(book)

  const navigate = useNavigate();

  const getBookDetails = (book) => {
     navigate(
      '/book/detail',
     { state:{
        book: book
      }}
     )
  }
  return (
    <div className={styles.bookitem} onClick={()=> getBookDetails(book)}>
      <img src={book?.imageUrl} className={styles.img}  alt={book.name} />
      <div className={styles.bookDetails}>
        <h4>{book?.title}</h4>
        {/* <h3>{book.author}</h3> */}
        {/* <p>{book.description}</p> */}
        <p>Price: ${book?.price}</p>
        {/* <div className={styles.actions}>
          <FaEdit className={styles.editIcon} onClick={() => editBook(book)} />
          <FaTrash className={styles.deleteIcon} onClick={() => deleteBook(book.id)} />
        </div> */}
      </div>
    </div>
  );
};

export default BookItem;
