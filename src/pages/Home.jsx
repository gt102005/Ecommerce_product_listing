import React from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/UseProducts'; // ✅ lowercase for hook
import './Home.css';

const Home = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  // Fallback in case products is not an array (to prevent .map error)
  if (!Array.isArray(products)) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          Invalid product data.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="home-container">
      <Typography className="home-heading">🛍️ Featured Products</Typography>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
