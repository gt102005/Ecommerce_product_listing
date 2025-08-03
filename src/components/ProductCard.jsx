import React, { useContext, useState } from 'react';
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
import { ModalContext } from '../context/ModelContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { openModal } = useContext(ModalContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card className="product-card">
      {!imageLoaded && !imageError && (
        <div className="product-image-placeholder">
          Loading...
        </div>
      )}
      
      {imageError ? (
        <div className="product-image-placeholder">
          Image not available
        </div>
      ) : (
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          className="product-image"
          style={{ display: imageLoaded ? 'block' : 'none' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      <CardContent>
        <Typography gutterBottom variant="subtitle1" className="product-title">
          {product.title}
        </Typography>
        <Typography variant="body1" className="product-price">
          ₹{product.price}
        </Typography>
      </CardContent>
      
      <CardActions className="card-actions">
        <Button 
          className="action-button-primary"
          onClick={() => addToCart(product)}
        >
          ADD TO CART
        </Button>
        <Button 
          className="action-button-secondary"
          onClick={() => openModal(product)}
        >
          VIEW DETAILS
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;