import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Chip } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import './SearchBar.css';

const SearchBar = ({ onSearch, searchTerm, onClearSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

  const handleSearch = (value) => {
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    onClearSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(localSearchTerm);
    }
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products by name..."
          value={localSearchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
            endAdornment: localSearchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  size="small"
                  className="clear-button"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      
      {searchTerm && (
        <div className="search-status">
          <Chip
            label={`Searching for: "${searchTerm}"`}
            onDelete={handleClear}
            color="primary"
            variant="outlined"
            className="search-chip"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;