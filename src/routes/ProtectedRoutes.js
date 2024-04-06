import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const {isAuthenticated} = useSelector((state) => state.userData);
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes