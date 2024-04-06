// Navbar.js
import React, { useState } from 'react';
import styles from './style.module.css'; // Import CSS modules
import ProductPopup from '../cart/ProductPopup'; // Import ProductPopup component
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { userData } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
    Cookies.remove('accessToken');
    dispatch(logout()); 
    navigate('/login');

  }

  return (
    <div className={styles.navbar}>
      <h2>Online Books</h2>
     <div className={styles.nav_small_cont}>
     <div onClick={handleLogout}>Logout</div>
     {
      userData?.user?.role == "user" && (
        <div className={styles.cartIcon} onClick={togglePopup}>
        <span className={styles.icon}>🛒</span>
        {showPopup && <ProductPopup />}
      </div>
      )
     }
     </div>
    </div>
  );
};

export default Navbar;
