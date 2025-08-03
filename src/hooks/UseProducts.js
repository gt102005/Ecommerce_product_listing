import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api'

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  getAllProducts()
    .then((res) => {
      console.log('API response:', res.data);
      setProducts(res.data.products || res.data); // ✅ fallback logic
      setLoading(false);
    })
    .catch((err) => {
      console.error('❌ API Error:', err.message || err);
      setError('Failed to fetch products');
      setLoading(false);
    });
}, []);






  return { products, loading, error };
};

export default useProducts;
