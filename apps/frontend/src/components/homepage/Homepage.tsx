import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import heroImg from "../../assets/images/homepageDrink.png";
import CustomButton from "./CustomButton";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Homepage = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to LastCall
            </Typography>
            <Title variant="h1">
              Bridging the Gap Between Drink Buyers and Sellers
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              With an unwavering commitment to enhancing the beverage industry, 
              LastCall bridges the gap between suppliers, distributors, retailers, and enthusiastic consumers.
            </Typography>
            <Link to={"/buyer"}>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="I'm a buyer!"
              heroBtn={true}
            />
            </Link>
            <br/>
            <Link to={"/seller"}>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="I'm a seller!"
              heroBtn={true}
            />
            </Link>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginTop: "10rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Homepage;
