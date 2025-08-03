import React, { useContext, useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import CartSidebar from './components/CartSidebar';
import ProductDetailModal from './components/ProductDetailModel'; // ✅ fixed name
import { ModalContext } from './context/ModelContext' // ✅ fixed name
import './App.css';

const App = () => {
  const { modalOpen, selectedProduct, closeModal } = useContext(ModalContext);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <Home />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <ProductDetailModal
        open={modalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </>
  );
};

export default App;
