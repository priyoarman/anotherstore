import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/products/${product.id}`}>
      <div className="p-4 bg-blue-100 shadow-md rounded-lg flex flex-col items-center h-full hover:shadow-lg transition">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover object-top mb-4 transform hover:scale-105 transition duration-300"
        />

        <div className="p-4 flex flex-col flex-grow">
          {/* Product Title */}
          <h3 className="text-xl font-semibold text-blue-900 hover:text-pink-800 transition duration-300">
            {product.title}
          </h3>

          {/* Product Price */}
          <p className="text-gray-600 mt-2 font-medium">${product.price}</p>
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="mt-4 bg-blue-900 text-white py-2 px-3 rounded hover:bg-blue-700 transition duration-300"
        >
          🛒 Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
