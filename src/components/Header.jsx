import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header({ darkMode, onToggleDark }) {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-blue-950 text-white p-4 flex justify-between items-center">
      {/* Website Title */}
      <Link
        to="/"
      >
        <h1 className="text-2xl font-bold text-fuchsia-50 font-mono">Another Store</h1>
      </Link>
      {/* Navigation and Cart */}
      <nav className="flex items-center space-x-6">
        <a href="/" className="hover:scale-125">
          Home
        </a>
        <a href="/products" className="hover:scale-125">
          Sale!
        </a>
        <button
          onClick={onToggleDark}
          className="h-8 mr-6 px-2 rounded bg-white dark:bg-gray-800"
          aria-label="Toggle light/dark theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div className="relative">
          <Link to="/cart">
            <button className="bg-pink-800 py-1 px-3 rounded hover:bg-red-600 hover:scale-105">
              View Cart
            </button>
            {/* Cart Counter */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
