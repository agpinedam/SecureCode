// src/hooks/useAuth.jsx

import { useAuth } from '../contexts/AuthContext';

const useAuthHook = () => {
  const { isLoggedIn, login, logout } = useAuth();
  return { isLoggedIn, login, logout };
};

export default useAuthHook;
