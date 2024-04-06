// BookList.js

import React from 'react';
import BookItem from '../bookItem/BookItem';
import styles from './style.module.css';

const BookList = ({ books, editBook, deleteBook }) => {
  return (
    <div className={styles.bookList}>
      {books.map(book => (
        <BookItem key={book._id} book={book} editBook={editBook} deleteBook={deleteBook} />
      ))}
    </div>
  );
};

export default BookList;
