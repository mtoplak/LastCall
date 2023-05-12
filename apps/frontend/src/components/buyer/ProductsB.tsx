import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import { drinks } from "../data/data";
import Drink from "./DrinkB";
import SearchInput from "./SearchInput";

const Products = () => {
  const PropertiesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",  // Allow products to wrap to the next line
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const DrinkContainer = styled(Box)(({ theme }) => ({
    flex: "0 0 33.33%",  // Set the width to one-third of the container
    marginBottom: theme.spacing(4),  // Add some margin between the products
  }));

  const PropertiesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));

  return (
    <Box sx={{ mt: 5, backgroundColor:"white", py: 10 }}>
      <Container>
        <Box>
          <SearchInput />
        </Box>
        <PropertiesTextBox>
          <Typography
            sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
          >
            Products
          </Typography>
          <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1 }}>
            Everything that you're looking for!
          </Typography>
        </PropertiesTextBox>

        <PropertiesBox>
          {drinks.map((drink) => (
            <DrinkContainer key={drink.id}>
              <Drink
                name={drink.name}
                img={drink.img}
                price={drink.price}
              />
            </DrinkContainer>
          ))}
        </PropertiesBox>
      </Container>
    </Box>
  );
};

export default Products;
