import React from "react";
import { featured } from "../../data/Data";

const FeaturedCard = () => {
  return (
    <div className="content grid3 mtop">
      {featured.map((item, index) => (
        <div className="box" key={index}>
          <img src={item.cover} alt="" className="img-fluid" />
          <h4>{item.name}</h4>
          <label>{item.total}</label>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCard;
