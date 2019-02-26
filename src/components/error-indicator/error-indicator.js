import React from "react";

import "./error-indicator.css";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <span className="boom">YAY!</span>
      <span>something has gone wrong</span>
      <span>(but that`s fine :))</span>
    </div>
  );
};

export default ErrorIndicator;
