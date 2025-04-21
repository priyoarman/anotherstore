import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
// import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  // State for managing search and category filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // State for the cart
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <BrowserRouter>
      {/* Header Component with Cart Count */}
      <Header
        cartCount={cart.length}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((m) => !m)}
      />

      {/* define app routes */}
      <Routes>
        {/* home page: shows Main (product list) */}
        <Route
          path="/"
          element={
            <Main
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setCart={setCart}
            />
          }
        />

        {/* product details page */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
