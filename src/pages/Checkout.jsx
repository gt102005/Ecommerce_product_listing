import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import { ArrowBack, Delete, Add, Remove } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import './Checkout.css';

const Checkout = ({ onBack }) => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryCharge;

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityIncrease = (product) => {
    addToCart(product);
  };

  const handleQuantityDecrease = (item) => {
    if (item.quantity > 1) {
      // Create a modified version to decrease quantity
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      // Remove one item
      removeFromCart(item.id);
      // Add back with reduced quantity if still > 0
      if (updatedItem.quantity > 0) {
        addToCart({ ...item, quantity: 0 }); // This will set it to the reduced quantity
      }
    } else {
      removeFromCart(item.id);
    }
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields');
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <Container className="checkout-container">
        <Paper className="order-success">
          <div className="success-icon">✅</div>
          <Typography variant="h4" className="success-title">
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" className="success-message">
            Thank you for your order. We'll send you a confirmation email shortly.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOrderPlaced(false);
              onBack();
            }}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container className="checkout-container">
      <div className="checkout-header">
        <IconButton onClick={onBack} className="back-button">
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" className="checkout-title">
          Checkout
        </Typography>
      </div>

      <Grid container spacing={3}>
        {/* Order Summary */}
        <Grid item xs={12} md={7}>
          <Card className="order-summary-card">
            <CardContent>
              <Typography variant="h6" className="section-title">
                Order Summary ({cartItems.length} items)
              </Typography>
              
              <List className="checkout-items-list">
                {cartItems.map((item) => (
                  <ListItem key={item.id} className="checkout-item">
                    <ListItemAvatar>
                      <Avatar
                        src={item.image}
                        alt={item.title}
                        variant="rounded"
                        className="item-image"
                      />
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={item.title}
                      secondary={`₹${item.price} each`}
                      className="item-details"
                    />
                    
                    <div className="quantity-controls">
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityDecrease(item)}
                        className="quantity-btn"
                      >
                        <Remove />
                      </IconButton>
                      <Typography className="quantity-text">
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityIncrease(item)}
                        className="quantity-btn"
                      >
                        <Add />
                      </IconButton>
                    </div>
                    
                    <Typography className="item-total">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    
                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Details & Payment */}
        <Grid item xs={12} md={5}>
          <Card className="customer-details-card">
            <CardContent>
              <Typography variant="h6" className="section-title">
                Delivery Information
              </Typography>
              
              <div className="form-fields">
                <TextField
                  fullWidth
                  label="Full Name *"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  margin="normal"
                  className="form-field"
                />
                
                <TextField
                  fullWidth
                  label="Email *"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  margin="normal"
                  className="form-field"
                />
                
                <TextField
                  fullWidth
                  label="Phone Number *"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  margin="normal"
                  className="form-field"
                />
                
                <TextField
                  fullWidth
                  label="Address *"
                  name="address"
                  multiline
                  rows={3}
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  margin="normal"
                  className="form-field"
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      margin="normal"
                      className="form-field"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="PIN Code"
                      name="pincode"
                      value={customerInfo.pincode}
                      onChange={handleInputChange}
                      margin="normal"
                      className="form-field"
                    />
                  </Grid>
                </Grid>
              </div>
              
              <Divider className="price-divider" />
              
              <div className="price-breakdown">
                <div className="price-row">
                  <Typography>Subtotal:</Typography>
                  <Typography>₹{totalPrice.toFixed(2)}</Typography>
                </div>
                
                <div className="price-row">
                  <Typography>Delivery:</Typography>
                  <Typography>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </Typography>
                </div>
                
                {deliveryCharge === 0 && (
                  <Alert severity="success" className="free-delivery-alert">
                    🎉 Free delivery on orders above ₹500!
                  </Alert>
                )}
                
                <Divider />
                
                <div className="price-row total-row">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" className="total-price">
                    ₹{finalTotal.toFixed(2)}
                  </Typography>
                </div>
              </div>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handlePlaceOrder}
                className="place-order-btn"
                disabled={cartItems.length === 0}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;