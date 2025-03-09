import React, { createContext, useContext, useState } from 'react';

// Creating the AuthContext
const AuthContext = createContext();

// AuthProvider to manage the authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to set the user
  const login = (userData) => setUser(userData);

  // Logout function to clear the user
  const logoutUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
