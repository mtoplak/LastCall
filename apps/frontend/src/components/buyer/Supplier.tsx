import { Card, CardMedia, Grid, Rating, Typography } from '@mui/material';
import HouseBox from 'components/ui/HouseBox';
import InfoBox from 'components/ui/InfoBox';
import { ISeller } from 'models/seller';
import React from 'react';
import winery from '../../assets/images/wine.png';
import brewery from '../../assets/images/beer.png';
import { SellerType } from '../../enums/seller.enum';

interface SupplierProps {
  seller: ISeller;
}

const Supplier: React.FC<SupplierProps> = ({ seller }) => {
  const companyTypeImage =
    seller.companyType === SellerType.WINERY ? winery : brewery;

  return (
    <>
      <Card sx={{ mt: 5, mb: 2}}>
        <Grid container spacing={1} sx={{ my: 3 , mx: 1}}>
          <Grid item xs={6} md={3}>
            <CardMedia
              component="img"
              image={companyTypeImage}
              sx={{
                maxHeight: 150,
                maxWidth: 150,
                mx: 4,
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ my: 4 }} md={7}>
            <Typography variant="h4" component="h2">
              {seller.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" >
              {seller.address}, {seller.city}, {seller.country}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {seller.companyType}
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} sx={{ my: 1 }}>
            <Typography component="legend">Rating</Typography>
            <Rating name="no-value" value={null} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Supplier;
