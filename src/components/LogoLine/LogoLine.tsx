import React from "react";
import "./LogoLine.css";

interface Logo {
  src: string;
  name: string;
}

interface LogoLineProps {
  logos: Logo[];
}

const LogoLine: React.FC<LogoLineProps> = ({ logos }) => {
  return (
    <div className='logo-line'>
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.name}
          className='logo-image'
        />
      ))}
    </div>
  );
};

export default LogoLine;
