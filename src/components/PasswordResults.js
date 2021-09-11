import React, { useState } from "react";

export const PasswordMeter = ({ passwordData, password }) => {
  const colorNum = (passwordData.score * 100) / 4;
  const strengthColor = () => {
    switch (passwordData.score) {
      case 0:
        return "#8b0000";
      case 1:
        return "red";
      case 2:
        return "yellow";
      case 3:
        return "orange";
      case 4:
        return "green";
      default:
        return "none";
    }
  };

  const changerPasswordColor = () => ({
    width: `${colorNum}%`,
    background: strengthColor(),
    height: "8px",
  });

  const scoreMessage = () => {
    switch (passwordData.score) {
      case 0:
        return "Your password is very weak.";
      case 1:
        return "Your password is weak.";
      case 2:
        return "Your password is fair.";
      case 3:
        return "Your password is strong.";
      case 4:
        return "Your password is very strong.";
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      <div className="progress" style={{ height: "8px" }}>
        <div
          className="progress-bar"
          style={
            password ? changerPasswordColor() : { backgroundColor: "none" }
          }
        ></div>
      </div>
      <br />
      {password ? <h4 className="text-center">{scoreMessage()}</h4> : ""}
      <br />
      {passwordData.score >= 0 && password ? (
        <React.Fragment>
          <p>
            It will take {passwordData.guessTimeString} to guess your password.{" "}
            {passwordData.warning}
          </p>
          <p>
            <strong>{passwordData.suggestions}</strong>
          </p>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default PasswordMeter;
