import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/admin';
import RegistrationForm from './pages/Register/Register';
import LoginForm from './pages/Login/Login';
import BookDetail from './pages/Bookdetail/BookDetail';
import BookStore from './pages/User/BookStore/BookStore';
import PrivateRoutes from './routes/ProtectedRoutes';
import { useSelector } from 'react-redux';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import LoadingSpinner from './Loader/Loader';


function App() {

   const { loading } = useSelector((state)=>state.utils);


  return (
    <>

    {
      loading && (<LoadingSpinner />)
    }
 
    <Routes>
      <Route path='/' Component={RegistrationForm} />
      <Route path='/login' Component={LoginForm} />
      <Route element={<PrivateRoutes />}>
           <Route path='/book/store' Component={BookStore} />
           <Route path='/admin/*' Component={AdminRoutes} />
           <Route path='/book/detail' Component={BookDetail} />
           <Route path='/book/store' Component={BookStore} />
            </Route>
    </Routes>
    </>
  );
}

export default App;
