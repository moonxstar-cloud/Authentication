import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
  
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data)); // Store user data
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Remove user data on error
      setUser(null);
    }
    setLoading(false);
  };
  


  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Save token
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user data
      setUser(res.data.user); // Update user state
      return res.data.user; // Return user data for navigation
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Throw error to handle it in the login component
    }
  }

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token); // Save token
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user data
      setUser(res.data.user); // Update user state
      return res.data.user; // Return user data for navigation
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Throw error to handle it in the signup component
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUserProfile = (updatedUser) => {
    console.log('Updating user profile in context:', updatedUser);
    setUser(updatedUser);
    
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);