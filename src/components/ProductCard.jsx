import React, { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import './ProductCard.css';
import { CartContext } from '../context/CartContext';
import { ModalContext } from '../context/ModelContext'; // ✅ make sure this exists

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { openModal } = useContext(ModalContext); // ✅ modal handler

  return (
    <Card className="product-card">
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        className="product-image"
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" className="product-title">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button size="small" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
        <Button size="small" onClick={() => openModal(product)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
