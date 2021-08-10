import axios from "axios";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import LoginSignContainer from "./components/LoginSignContainer";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("/users/verify", {
          headers: {
            Authorization: token,
          },
        });
        // console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <>
      {isLogin ? (
        <Home setIslogin={setIsLogin} />
      ) : (
        <LoginSignContainer setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default App;
