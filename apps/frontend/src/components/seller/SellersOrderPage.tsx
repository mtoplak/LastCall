import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { IOrder } from 'models/order';
import api from 'services/api';
import NavbarB from 'components/buyer/NavbarB';

function SellerOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [checked, setChecked] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleToggle = (order: IOrder) => () => {
    const isChecked = checked.some(
      (checkedOrder) => checkedOrder._id === order._id
    );
    const newChecked = isChecked
      ? checked.filter((checkedOrder) => checkedOrder._id !== order._id)
      : [...checked, order];

    setChecked(newChecked);
  };

  const handleChangeStatus = async (status: string) => {
    try {
      const orderIds = checked.map((order) => order._id);
      await Promise.all(
        orderIds.map((orderId) =>
          api.patch(`/orders/${orderId}`, { status })
        )
      );
      const updatedOrders = orders.map((order) =>
        orderIds.includes(order._id) ? { ...order, status } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      throw error;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Order accepted':
        return 'primary';
      case 'In-Transit':
        return 'orange';
      case 'Delivered':
        return 'green';
      case 'Cancel':
        return 'error';
      default:
        return 'inherit';
    }
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
        <NavbarB />
        <Container>
          <Typography variant="h4" component="h1" sx={{ mt: 6, mb: 4 }}>
            Order List
          </Typography>
          {orders.length === 0 ? (
            <Typography variant="body1" mb={4}>
              Your order list is empty.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h2" mb={2}>
                      Change status
                    </Typography>
                    <Divider />
                    <Box my={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleChangeStatus('Order accepted')}
                      >
                        Accept
                      </Button>
                    </Box>
                    <Box my={2}>
                      <Button
                        variant="contained"
                        color="warning"
                        fullWidth
                        onClick={() => handleChangeStatus('In-Transit')}
                      >
                        In-Transit
                      </Button>
                    </Box>
                    <Box my={2}>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => handleChangeStatus('Delivered')}
                      >
                        Delivered
                      </Button>
                    </Box>
                    <Divider />
                    <Box my={2}>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => handleChangeStatus('Cancel')}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={10}>
                {orders.map((order) => (
                  <Card
                    key={order._id}
                    sx={{
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={1} sx={{ mt: 3 }}>
                        <Checkbox
                          checked={checked.some(
                            (checkedOrder) =>
                              checkedOrder._id === order._id
                          )}
                          onChange={handleToggle(order)}
                          inputProps={{
                            'aria-label': 'select order',
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            component="h2"
                          >
                            <b>ORDER ID: {order._id}</b>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Price: €
                            {order.totalPrice.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={3}>
                        <CardContent>
                          Current status: 
                          <Typography
                            color={getStatusColor(order.status)}
                          >
                            <b>{order.status}</b>
                            </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={2}>
                      <Grid item xs={1} />
                      <Grid item xs={5}>
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            component="h2"
                            color="text.secondary"
                          >
                            <b>Address details:</b>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Address: {order.address}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Location: {order.city}, {order.country}
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={5}>
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            component="h2"
                            color="text.secondary"
                          >
                            <b>Purchase/delivery dates:</b>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Date of delivery: DATE
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Date of purchase: DATE
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
}

export default SellerOrdersPage;
