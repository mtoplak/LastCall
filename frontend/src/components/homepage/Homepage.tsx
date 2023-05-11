import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";


const Homepage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url("path/to/your/image.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        LastCall
      </Typography>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente praesentium ea error illo cum distinctio sint magnam, architecto, modi similique doloribus temporibus quae tenetur! Minima voluptate necessitatibus ducimus optio atque.
      </Typography>
      <Button variant="contained" color="success" sx={{ my: 2 }}>
        <Link to={"/buyer"} className="link">
          I'm a Buyer
        </Link>
      </Button>
      <Button variant="contained" color="primary" sx={{ my: 2 }}>
        I'm a Seller
      </Button>
    </Container>
    </Box>
  );
};

export default Homepage;
