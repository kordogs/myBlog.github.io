/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      fetch("http://localhost:4000/Profile", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((userInfo) => {
          setUserInfo(userInfo);
        })
        .catch((error) => {
          //  Handle any errors that occur during the request
          console.error(error);
        });
    }
  }, []); // Add the dependency array if needed
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
