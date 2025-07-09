import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CountdownScreen = () => {
  const navigate = useNavigate();
  const [displayCountdown, setDisplayCountdown] = useState(3);

  useEffect(() => {
    if (typeof displayCountdown === "number" && displayCountdown > 1) {
      const timer = setTimeout(() => {
        setDisplayCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (displayCountdown === 1) {
      const startTextTimer = setTimeout(() => {
        setDisplayCountdown("Start!");
      }, 1000);
      return () => clearTimeout(startTextTimer);
    }
  }, [displayCountdown]);

  useEffect(() => {
    if (displayCountdown === "Start!") {
      const navigateTimer = setTimeout(() => {
        navigate("/game");
      }, 1000);
      return () => clearTimeout(navigateTimer);
    }
  }, [displayCountdown, navigate]);

  return <div className="countdown">{displayCountdown}</div>;
};

export default CountdownScreen;
