import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ChatPage from './ChatPage';

const PrivateRoute = () => {
  const auth = useAuth();

  return auth.loggedIn ? <ChatPage /> : <Navigate to="/login" />;
};

export default PrivateRoute;
