import React, { useState, useEffect } from "react";

const Home = ({ setIslogin }) => {
  const [userData, setUserData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userName = async () => {
    try {
      const token = localStorage.getItem("tokenStore");
      const response = await fetch("users/getData", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userName();
  }, []);

  const logoutControl = () => {
    localStorage.clear();
    setIslogin(false);
  };
  return (
    <>
      <div className="home-container">
        <h1>
          Welcome
          <span> {userData.name}</span>
        </h1>
        <button className="logout-btn" onClick={logoutControl}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
