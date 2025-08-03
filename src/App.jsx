import React, { useContext, useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import CartSidebar from './components/CartSidebar';
import ProductDetailModal from './components/ProductDetailModel';
import { ModalContext } from './context/ModelContext';
import './App.css';

const App = () => {
  const { modalOpen, selectedProduct, closeModal } = useContext(ModalContext);
  const [cartOpen, setCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToHome = () => {
    setShowCheckout(false);
  };

  return (
    <>
      <Header onCartClick={handleCartClick} />
      
      {showCheckout ? (
        <Checkout onBack={handleBackToHome} />
      ) : (
        <Home />
      )}
      
      <CartSidebar 
        open={cartOpen} 
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      <ProductDetailModal
        open={modalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </>
  );
};

export default App;