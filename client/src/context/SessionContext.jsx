import { createContext, useState, useContext } from "react";

// 1. Create the context
const SessionContext = createContext();

// 2. Custom hook to consume context easily
export const useSession = () => useContext(SessionContext);

// 3. SessionProvider component to wrap your app
export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Called after successful login
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Called on logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, user, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
