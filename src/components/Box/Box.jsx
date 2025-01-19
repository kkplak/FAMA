import React from "react";
import PropTypes from "prop-types";
import "./Box.css"; // Importing optional CSS for styling

const Box = ({ iconPath, title, description }) => {
  return (
    <div className="box-offert">
    <div className="box-icon">
      <img src={iconPath} alt={`${title} Icon`} />
    </div>
    <h3 className="box-title">{title}</h3>
    <p className="box-description">{description}</p>
  </div>
  );
};

Box.propTypes = {
  iconPath: PropTypes.node.isRequired, 
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Box;
