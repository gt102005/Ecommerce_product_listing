import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import "./ProductDetailModel.css" // ✅ Correct file

const ProductDetailModal = ({ open, onClose, product }) => {
  if (!product) return null;

  const { title, image, description, category, rating } = product;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className="modal-content">
        <img src={image} alt={title} className="modal-image" />

        <Typography variant="body1" sx={{ mt: 2 }}>
          {description}
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Category: <strong>{category}</strong>
        </Typography>

        {rating && (
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Rating: {rating.rate} ⭐ ({rating.count} reviews)
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
