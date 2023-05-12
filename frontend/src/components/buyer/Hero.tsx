import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import banner from "../../assets/images/drinks-banner.jpg";
import NavbarB from "./NavbarB";
import CustomButton from "../../components/homepage/CustomButton";
import heroImg from "../../assets/images/homepageDrink.png";
import SearchInput from "./SearchInput";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#262626",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
      <Container>
        <NavbarB />
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
              LastCall bridges the gap between suppliers, distributors,
              retailers, and enthusiastic consumers.
            </Typography>
            <Typography>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="More About Us"
              heroBtn={true}
            />
            </Typography>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginTop: "7rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
