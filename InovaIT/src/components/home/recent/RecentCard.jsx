import React from "react";
import { list } from "../../data/Data";

const RecentCard = () => {
  return (
    <div className="content grid3 mtop">
      {list.map((val, index) => {
        const { cover, category, location, name, price, type } = val;
        return (
          <div className="box shadow" key={index}>
            <div className="img">
              <img src={cover} alt="" className="img-fluid" />
            </div>
            <div className="text">
              <div className="category d-flex">
              <span style={{ background: category === "Na zalogi" ? "#25b5791a" : "#ff98001a", color: category === "Na zalogi" ? "#25b579" : "#ff9800" }}>{category}</span>
                <i className="fa fa-heart"></i>
              </div>
              <h4>{name}</h4>
              <p>
                <i className="fa fa-location-dot"></i> {location}
              </p>
            </div>
            <div className="button d-flex">
              <div>
                <button className="btn btn-primary">{price}</button> <label htmlFor=""></label>
              </div>
              <span>{type}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentCard;
