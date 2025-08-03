import React, { useState, useMemo } from 'react';
import { CircularProgress, Typography, TextField, MenuItem, Box, InputAdornment } from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import useProducts from '../hooks/UseProducts';
import './Home.css';

const Home = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from products
  const categories = useMemo(() => {
    if (!Array.isArray(products)) return [];
    
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return [
      { id: 'all', name: 'All Products', count: products.length },
      ...uniqueCategories.map(category => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1).replace(/'/g, "'"),
        count: products.filter(product => product.category === category).length
      }))
    ];
  }, [products]);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    let filtered = products;

    // Filter by category first
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Then filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Optionally clear search when changing category
    // setSearchTerm('');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  // Fallback in case products is not an array (to prevent .map error)
  if (!Array.isArray(products)) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem' }}>
        <Typography variant="h6" color="error">
          Invalid product data.
        </Typography>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Featured Products Header Section */}
      <div className="featured-section-header">
        <div className="section-badge">
          <span className="badge-icon">⚡</span>
          <span className="badge-text">TRENDING NOW</span>
        </div>
        
        <h1 className="featured-title">
          Featured Products
        </h1>
        
        <p className="featured-subtitle">
          Discover our handpicked selection of premium products
        </p>
        
        <div className="title-underline">
          <div className="underline-dot"></div>
          <div className="underline-line"></div>
          <div className="underline-dot"></div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onClearSearch={handleClearSearch}
      />

      {/* Categories Filter Input */}
      <div className="categories-filter-section">
        <Box className="filter-container">
          <TextField
            select
            label="Filter by Category"
            value={selectedCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            variant="outlined"
            className="category-select"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              ),
            }}
            SelectProps={{
              MenuProps: {
                className: 'category-menu',
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id} className="category-menu-item">
                <Box className="category-item-content">
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">({category.count})</span>
                </Box>
              </MenuItem>
            ))}
          </TextField>

          {/* Active Category Display */}
          {selectedCategory !== 'all' && (
            <div className="active-category-display">
              <Typography variant="body2" className="active-category-text">
                Showing: <strong>{categories.find(cat => cat.id === selectedCategory)?.name}</strong>
              </Typography>
            </div>
          )}
        </Box>
      </div>

      {/* Search/Filter Results Info */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div className="search-results-info">
          <Typography variant="body1" className="results-text">
            {filteredProducts.length === 0 
              ? `No products found ${searchTerm ? `for "${searchTerm}"` : ''} ${selectedCategory !== 'all' ? `in ${categories.find(cat => cat.id === selectedCategory)?.name}` : ''}`
              : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} ${searchTerm ? `for "${searchTerm}"` : ''} ${selectedCategory !== 'all' ? `in ${categories.find(cat => cat.id === selectedCategory)?.name}` : ''}`
            }
          </Typography>
        </div>
      )}

      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.length === 0 && (searchTerm || selectedCategory !== 'all') ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <Typography variant="h6" className="no-results-title">
              No products found
            </Typography>
            <Typography variant="body2" className="no-results-subtitle">
              {searchTerm && selectedCategory !== 'all' 
                ? `Try different keywords or browse other categories`
                : searchTerm 
                ? `Try searching with different keywords or browse all products`
                : `No products available in this category`
              }
            </Typography>
            <div className="no-results-actions">
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="clear-action-btn"
                >
                  Clear Search
                </button>
              )}
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => handleCategorySelect('all')}
                  className="clear-action-btn secondary"
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;