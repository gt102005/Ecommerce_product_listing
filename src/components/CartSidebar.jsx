import React, { useContext } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // ✅ CORRECT
import './CartSidebar.css';
import { CartContext } from '../context/CartContext';

const CartSidebar = ({ open, onClose }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="cart-container">
        <Box className="cart-header">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <List>
          {cartItems.length === 0 ? (
            <ListItem>
              <ListItemText primary="Cart is empty" />
            </ListItem>
          ) : (
            cartItems.map((item) => (
              <ListItem key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-img" />
                <ListItemText
                  primary={item.title}
                  secondary={`₹${item.price} x ${item.quantity}`}
                />
                <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
              </ListItem>
            ))
          )}
        </List>

        {cartItems.length > 0 && (
          <>
            <Divider />
            <Box className="cart-footer">
              <Typography>Total: ₹{totalPrice.toFixed(2)}</Typography>
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
