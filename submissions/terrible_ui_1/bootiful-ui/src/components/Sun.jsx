import React from "react";
import { useState, useEffect } from "react";
import sun1 from "../assets/sun1.png";
import sun2 from "../assets/sun2.png";
import sun3 from "../assets/sun3.png";
import sun5 from "../assets/sun5.png";
import sun6 from "../assets/sun6.png";

const sun = [sun1, sun2, sun3, sun5, sun6];

export default function Sun() {
  const [currentSun, setCurrentSun] = useState(sun1);

  useEffect(() => {
    const sunImgChange = setInterval(() => {
      setCurrentSun(sun[Math.floor(Math.random() * sun.length)]);
    }, 150);

    return () => clearInterval(sunImgChange);
  }, []);
  return (
    <div>
      <img src={currentSun} alt="Sun" className="sun" />
    </div>
  );
}
