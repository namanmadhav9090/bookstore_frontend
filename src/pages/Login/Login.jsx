// LoginForm.js

import React, { useState } from 'react';
import styles from './style.module.css';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import useApiServices from '../../services/useApiService';
import { apiRoutes } from '../../services/apiRoutes';
import Cookies from 'js-cookie';
import { setUser } from "../../store/slices/userSlice";

const LoginForm = () => {

  const { apiPost } = useApiServices();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    try {
      const response = await apiPost(
        apiRoutes.USER_LOGIN, formData
      );

      console.log(response)
      if (response) {
        const token = response.access_token;
        Cookies.set('accessToken', token, { expires: 1 });
        dispatch(setUser(response))

        if(response?.user?.role == "admin"){
          navigate("/admin/dashboard");
        } else {
          navigate("/book/store");
        }
      } else {
     
      }
    } catch (error) {
      console.error('Error registering user:', error?.response?.data?.message);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
       

        <div className={styles.btm}>
         
        <button type="submit">Login</button>
        <a href='/'>register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
