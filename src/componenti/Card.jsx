/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Card = ({ title,text,  path }) => {
    return (
        <div className="card">
          <h3>{title}</h3>
          <p>{text}</p>
          <Link to={path} className="card-button">Visualizza tutti {title}</Link>
        </div>
      );
    };

export default Card;
