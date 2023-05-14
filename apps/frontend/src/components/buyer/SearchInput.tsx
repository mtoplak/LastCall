import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const SearchInput = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F5", p: 2 }}>
      <FormControl sx={{ display: "block", alignItems: "center" }}>
        <TextField id="outlined-basic" label="Product Name" variant="outlined" sx={{ mr: 3, mb: 2, mt: 2 }} />
        <InputLabel id="filter-location"/>
        <Select labelId="filter-location" sx={{ mr: 3, mb: 2, mt: 2 }} defaultValue="location">
          <MenuItem value="location">-- Location --</MenuItem>
          <MenuItem value="location1">Slovenia</MenuItem>
          <MenuItem value="location2">Austria</MenuItem>
          <MenuItem value="location3">United Kingdom</MenuItem>
        </Select>
        <InputLabel id="filter-location" />
        <Select labelId="filter-type" sx={{ mr: 3, mb: 2, mt: 2 }} defaultValue="type"> 
          <MenuItem value="type">-- Product Type --</MenuItem>
          <MenuItem value="type1">Alchohol</MenuItem>
          <MenuItem value="type2">Carbonated</MenuItem>
          <MenuItem value="type3">Not carbonated</MenuItem>
        </Select>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#262626", color: "#ffffff", mt: 0 }}
        >
          Filter
        </Button>
      </FormControl>
    </Box>
  );
};

export default SearchInput;
