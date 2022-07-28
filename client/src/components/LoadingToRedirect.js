import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 500);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div style={{ marginTop: "100px" }}>
      <h5>Redirectin you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;
