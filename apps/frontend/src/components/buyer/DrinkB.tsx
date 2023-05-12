import { Box, styled, Typography, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface DrinkProps {
  name: string;
  img: string;
  price: number;
}

const DrinkB: React.FC<DrinkProps> = ({ name, img, price }) => {
  const HouseBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    maxWidth: 350,
    backgroundColor: "#E6F0FF",
    color: "black",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    margin: theme.spacing(2),
    "&:hover": {
      transform: "scale(1.05)",
    },
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(2, 0),
    },
  }));

  const InfoBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
    overflow: "hidden",
  }));

  const Image = styled("img")({
    width: "100%",
    height: "auto",
  });

  return (
    <HouseBox>
      <ImgContainer>
        <Image src={img} alt="housePhoto" />
      </ImgContainer>

      <InfoBox>
        <Typography variant="h6" sx={{ fontWeight: "700" }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          Cena: {price}€
        </Typography>
        <IconButton color="primary" aria-label="Add to Order">
          <AddCircleOutlineIcon />
        </IconButton>
      </InfoBox>
    </HouseBox>
  );
};

export default DrinkB;
