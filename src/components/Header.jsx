/** This component renders the header for each page on the app. */

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IoHome } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";

function Header() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "bg-gray-950";
  });
  const [label, setLabel] = useState("🌙");

  const toggleTheme = () => {
    setTheme((prev) => prev === "bg-gray-950" ? "bg-white" : "bg-gray-950");
    setLabel((prev) => (prev === "🌙" ? "🔆" : "🌙"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <header className="text-yellow-600 p-4 flex justify-between items-center">
      {/* Website Title */}
      <NavLink to="/">
        <h2 className="text-2xl font-extrabold">Another Shop</h2>
      </NavLink>
      {/* Navigation and Cart */}
      <nav className="flex items-center space-x-4">
        <a href="/" className="text-xl hover:scale-125">
          <IoHome />
        </a>
        <Link to={"./Sale"} className="text-xl hover:scale-125">
          <RiDiscountPercentFill />
        </Link>
        <button
          className="h-8 rounded text-xl font-bold hover:scale-125 cursor-pointer"
          aria-label="Toggle light/dark theme" onClick={toggleTheme}
        >{label}
        </button>
        <div className="relative ml-4">
          <button className="text-yellow-600 pr-2 text-xl hover:scale-125 cursor-pointer">
            <FaHeart />
          </button>
          <NavLink to="/cart">
            <button className="text-orange-600 p-1 text-2xl hover:scale-125 cursor-pointer">
              <IoBagHandleSharp />
            </button>
            {/* Cart Counter */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-white bg-orange-600 font-semibold rounded-full text-xs px-1">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
