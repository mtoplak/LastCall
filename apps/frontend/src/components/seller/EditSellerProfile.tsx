import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import api from 'services/api';
import NavbarS from './NavbarS';

interface SellerProfile {
  email: string;
  name: string;
  address: string;
  phone: string;
}

function EditSellerProfile() {
  

  return (
    <>
			<NavbarS />
		</>
  );
}

export default EditSellerProfile;

