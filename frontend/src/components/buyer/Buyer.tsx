import React from "react";
import Hero from "./Hero";
import Products from "./Products";
import { Box } from "@mui/material";
import Footer from "../homepage/Footer";

const Buyer = () => {
  return (
    <Box sx={{ backgroundColor: "#E6F0FF"}}>
      <Hero />
      <Products />
      <Footer />
    </Box>
  );
};

export default Buyer;