// ProductPopup.js
import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // Import CSS modules
import useApiServices from "../../services/useApiService";
import { apiRoutes } from "../../services/apiRoutes";
import { useDispatch } from "react-redux";
import { successAlert } from "../../store/slices/utilSlice";

const ProductPopup = () => {
  const { apiGet, apiPost, apiDelete } = useApiServices();
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState();
  const [clearCart, setClearCart] = useState(true);

  const getCartItems = async () => {
    try {
      const response = await apiGet(apiRoutes.ADD_TO_CART);
      setBooks(response);
      const totalPrice = response?.reduce((acc, val) => {
        return (acc += val?.bookPrice);
      }, 0);
      setTotal(totalPrice);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleQuantityChange = async (book, action) => {
    let updatedQty = book.quantity;

    let type;

    if (action === "decrement" && updatedQty > 1) {
      updatedQty--; // Decrease quantity by 1 if greater than 1
      type = "decrement";
    } else if (action === "increment") {
      updatedQty++; // Increase quantity by 1
      type = "increment";
    } else {
      return; // Do nothing if action is not valid or quantity is already 1 and trying to decrement further
    }

    try {
      // Update the quantity for the specific book item in the cart
      const updatedBook = { ...book, quantity: updatedQty, type: type };

      const response = await apiPost(apiRoutes.ADD_TO_CART, updatedBook);

      if (response) {
        getCartItems(); // Refresh cart items after quantity update
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data);
    }
  };

  const deleteItem = async (id) => {
    if (id) {
      try {
        const response = await apiDelete(
          `${apiRoutes.ADD_TO_CART}?itemId=${id}&clearCart=${false}`
        );

        getCartItems();
      } catch (error) {
        console.log(error);
        alert(error?.response?.data);
      }
    } else {
      try {
        const response = await apiDelete(
          `${apiRoutes.ADD_TO_CART}?clearCart=${true}`
        );

        getCartItems();
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    }
  };

  const clearCartItems = async () => {
    deleteItem();
  };
  return (
    <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
      <div className={styles.top_cont}>
        <p>Total : {total}</p>
        <div className={styles.clearCartBtn} onClick={clearCartItems}>
          <p>Clear cart</p>
        </div>
      </div>

      <div className={styles.books_cont}>
        {books?.map((book) => (
          <div key={book._id} className={styles.productItem}>
            <img
              src={book.imageUrl}
              alt={book.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <span className={styles.title}>{book.bookTitle}</span>
              <span>${book.bookPrice}</span>
              <div className={styles.quantityControl}>
                <div
                  className={styles.qtybtn}
                  onClick={() => handleQuantityChange(book, "decrement")}
                >
                  -
                </div>
                <span>{book?.quantity}</span>
                <div
                  className={styles.qtybtn}
                  onClick={() => handleQuantityChange(book, "increment")}
                >
                  +
                </div>
              </div>

              <div onClick={() => deleteItem(book._id)}>Delete</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.checkout_btn}>
        <p>CheckOut</p>
      </div>
    </div>
  );
};

export default ProductPopup;
