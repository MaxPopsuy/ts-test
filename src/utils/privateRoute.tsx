import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuthenticated } from '../redux/auth/auth-selectors';
import routes from './routes';
interface Props {
  children: React.ReactNode | React.ReactChildren;
}
const PrivateRoute = ({ children }) => {
  console.log(children);
  const isAuthorized = useSelector(getIsAuthenticated);
  return isAuthorized ? children : <Navigate to={routes.loginPage} />;
};

export default PrivateRoute;
