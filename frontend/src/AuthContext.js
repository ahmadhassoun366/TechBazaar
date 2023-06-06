import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = (userData,authToken ) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(authToken);

  };

  const logout = () => {
    setIsAuthenticated(false);  
    setUser(null);
    setToken(null);
    console.log("User logged out Successfully");
    console.log(setUser);
    console.log(setToken)
    alert("User logged out Successfully");
    navigate('/');
  };

  const register = (userData) => {
    // Perform registration logic here
    // For example, make a POST request to your API endpoint

    fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API

        // Assuming the response includes the registered user data, you can login the user
        login(data.user, data.token);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const saveToken = (token) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token,saveToken, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
