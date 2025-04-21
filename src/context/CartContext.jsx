import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Load cart items from localStorage when the provider is mounted

  useEffect(() => {
    console.log("CartProvider mounted. Attempting to load cart from localStorage...");
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart);
        console.log("Loaded cart from localStorage:", parsedItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error("Failed to parse cartItems from localStorage", error);
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  
  useEffect(() => {
    console.log("Cart changed. Saving cartItems to localStorage:", cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItems = prevItems.find((item) => item.id === product.id);
      if (existingItems) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;