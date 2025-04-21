import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetails(){
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center col-span-full">Loading product details...</p>;
  }

  if (!product) {
    return <p className="p-4">No product found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-pink-800 hover:underline">&larr; Back to Products</Link>
      <div className="flex flex-col md:flex-row mt-18">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-64 object-contain rounded"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl text-blue-900 font-bold">{product.title}</h1>
          <p className="mt-2 text-blue-900">${product.price}</p>
          <p className="mt-4 text-blue-900">{product.description}</p>
          <button onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
            className="mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
