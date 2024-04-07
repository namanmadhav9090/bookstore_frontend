// RegistrationForm.js

import React, { useState } from 'react';
import styles from './style.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApiServices from '../../services/useApiService';
import { apiRoutes } from '../../services/apiRoutes';
import Cookies from 'js-cookie';
import { setUser } from "../../store/slices/userSlice";

const RegistrationForm = () => {

  const { apiPost } = useApiServices();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' // Default role is 'user'
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
    try {
      const response = await apiPost(
        apiRoutes.USER_REGISTER, formData
      );
      if (response) {
        const token = response.access_token;
        Cookies.set('accessToken', token, { expires: 1 });
        dispatch(setUser(response))

        if(response?.user?.role == "admin"){
          navigate("/admin/dashboard");
        } else {
          navigate("/book/store");
        }
        // navigate("/admin/dashboard");
      } else {
     
      }
    } catch (error) {
      console.error('Error registering user:', error?.response?.data);
      alert(error?.response?.data);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <h2>Register</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className={styles.formGroup}>
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
    

        <div className={styles.btm}>
         
        <button type="submit">Register</button>
         <a href='/login'>login</a>
         </div>

        
      </form>

    </div>
  );
};

export default RegistrationForm;
