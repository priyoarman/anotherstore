/** This component renders the main page (HomePage) for the app. */

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";

function HomePage({
  searchInput,
  setSearchInput,
  selectedCategory,
  setSelectedCategory,
  setCart,
}) {
  // State for storing products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the Fake Store API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // Empty dependency array to ensure the fetch runs once

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="p-6 min-h-screen auto-rows-fr">
      {/* Welcome Section */}
      <section className="text-center mb-8">
        <h2 className="text-xl font-semibold text-yellow-600">
          Welcome to Another Store!
        </h2>
        <p className="mt-4 text-yellow-700">
          Explore our wide range of products below.
        </p>
      </section>

      {/* Filters Section */}
      <Filters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Product Listings */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-6">
        {loading ? (
          <p className="text-center text-md font-semibold text-yellow-700 col-span-full animate-pulse">
            Loading products...
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default HomePage;
