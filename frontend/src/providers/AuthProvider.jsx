import { useState, useMemo } from 'react';
import axios from 'axios';

import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const localToken = localStorage.getItem('userToken');
  const [token, setToken] = useState(localToken);

  const loggedIn = Boolean(token);

  const logIn = async (userData) => {
    const res = await axios.post('/api/v1/login', userData);
    const newToken = res.data.token;
    localStorage.setItem('userToken', newToken);
    setToken(newToken);
  };
  const logOut = () => {
    localStorage.removeItem('userToken');
    setToken(null);
  };

  const context = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
