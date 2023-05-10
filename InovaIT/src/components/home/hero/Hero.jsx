import React from "react";
import Heading from "../../common/Heading";
import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <Heading title="LastCall" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." />

        <form className="d-flex">
          <div className="box">
            <span>Lokacija</span>
            <input type="text" className="form-control" placeholder="Location" />
          </div>
          <div className="box">
            <span>Naziv</span><input type="text" className="form-control" placeholder="Property Type" />
          </div>
          <button className="btn btn-primary">
            <i className="fa fa-search"></i>
          </button>
          <br />
          <br />
        </form>
      </div>
    </section>
  );
};

export default Hero;
