import React from "react";
import slika from "./assets/images/images.jpg";

const App = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <img src={slika} alt="My Image" />
    </div>
  );
};
export default App;
