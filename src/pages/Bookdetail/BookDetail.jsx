// BookDetail.js
import React, { useState } from 'react';
import styles from './style.module.css';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import useApiServices from '../../services/useApiService';
import { apiRoutes } from '../../services/apiRoutes';
import Navbar from '../../components/navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';


const BookDetail = () => {
    const { apiPost, apiDelete } = useApiServices();
    const { userData } = useSelector((state)=> state.userData);
    const location  = useLocation();
    const [bookdata,setBookData] = useState({
      bookId:location?.state?.book?._id,
      bookTitle: location?.state?.book?.title,
      bookPrice: location?.state?.book?.price,
      imageUrl: location?.state?.book?.imageUrl,
      quantity: 1
    });
   
    const navigate = useNavigate();
  
  const { title, author, price, description, imageUrl } = location?.state?.book;

  const editBook = (data)=> {
   
       navigate("/admin/book/add", {
        state : {
          book: data
        }
       })
  };
  const deleteBook = async(id) => {
    try {
      const response = await apiDelete(`${apiRoutes.BOOK_DATA}${id}`);
      if(response){
         alert("book delete successfully");
         navigate("/admin/dashboard");
      }
    } catch (error) {
       console.log(error);
       return alert(error?.response?.data?.message);
    }
  }


  const addToCart = async() => {
    try {
      const response = await apiPost(apiRoutes.ADD_TO_CART, bookdata);
      if(response){
          toast("product added to cart")
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  }

  return (
    <>
    <Navbar />
    <ToastContainer />
      <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <h2>{title}</h2>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Description:</strong> {description}</p>

        {userData?.user?.role == "user" && (
          <div onClick={addToCart} className={styles.cartbtn}>
          <p>Add to cart</p>
      </div>
        )}

     {
      userData?.user?.role === "admin" && (
        <div className={styles.icons}>
        <FaEdit className={styles.editIcon} onClick={() => editBook(location?.state?.book)} />
        <FaTrash className={styles.deleteIcon} onClick={() => deleteBook(location?.state?.book?._id)} />
      </div>
      )
     }
      </div>

     
     </div>
    </>
  );
};

export default BookDetail;
