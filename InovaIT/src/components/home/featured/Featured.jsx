import React from "react";
import Heading from "../../common/Heading";
import FeaturedCard from "./FeaturedCard";
import "./Featured.css";

const Featured = () => {
  return (
    <section className="featured background">
      <div className="container">
        <Heading title="Pijače" subtitle="Lorem ipsum dolor sit amet." />
        <div className="row">
          <div className="col">
            <FeaturedCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;

