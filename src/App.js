import "./App.css";
import React, { useState, useEffect } from "react";
import PasswordResults from "./components/PasswordResults";

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordData, setPasswordData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const passwordResults = async () => {
      const res = await fetch(
        "https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);
      setPasswordData(data);
    };
    passwordResults();
  }, [password]);

  const handleOnChange = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="col-md-6 mx-auto">
        <h3 className="text-center my-5">Is your password strong enough?</h3>
        <div className="form-group mb-1">
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="form-control shadow-none"
            placeholder="Type a password"
            value={password}
            onChange={handleOnChange}
          />
          <i
            className={`${
              showPassword ? "bi-eye" : "bi-eye-slash"
            } bi eye-icon`}
            onClick={togglePassword}
          ></i>
        </div>
        <PasswordResults
          passwordData={passwordData}
          password={password}
        ></PasswordResults>
      </div>
    </div>
  );
};

export default App;
