import { Navigate } from 'react-router-dom';
import routes from '../routes';
import useAuth from '../hooks/useAuth';
import ChatPage from './ChatPage';

const PrivateRoute = () => {
  const auth = useAuth();

  return auth.loggedIn ? <ChatPage /> : <Navigate to={routes.loginPage()} />;
};

export default PrivateRoute;
