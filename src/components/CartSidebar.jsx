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
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './CartSidebar.css';
import { CartContext } from '../context/CartContext';

const CartSidebar = ({ open, onClose, onCheckout }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose(); // Close the sidebar
    onCheckout(); // Navigate to checkout
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="cart-container">
        <Box className="cart-header">
          <div className="cart-title">
            <ShoppingCartIcon className="cart-icon" />
            <Typography variant="h6">Your Cart</Typography>
            <div className="cart-count">{cartItems.length}</div>
          </div>
          <IconButton onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <Typography variant="h6" className="empty-cart-title">
                Your cart is empty
              </Typography>
              <Typography variant="body2" className="empty-cart-subtitle">
                Add some products to get started
              </Typography>
            </div>
          ) : (
            <List className="cart-items-list">
              {cartItems.map((item) => (
                <ListItem key={item.id} className="cart-item">
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      alt={item.title}
                      variant="rounded"
                      className="cart-item-image"
                    />
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <div className="item-details">
                        <span className="item-price">₹{item.price}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                        <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    }
                    className="cart-item-text"
                  />
                  
                  <Button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                    size="small"
                  >
                    Remove
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <Divider />
            <Box className="cart-footer">
              <div className="total-section">
                <Typography variant="h6" className="total-text">
                  Total: ₹{totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2" className="items-count">
                  {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                </Typography>
              </div>
              
              <Button 
                variant="contained" 
                fullWidth
                size="large"
                onClick={handleCheckout}
                className="checkout-button"
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartSidebar;