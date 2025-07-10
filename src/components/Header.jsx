/** This component renders the header for each page on the app. */

import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IoHome } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdWbSunny } from "react-icons/md";
import { BsMoonFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";

function Header({ 
  darkMode, 
  onToggleDark, 
 }) {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-blue-100 text-blue-900 p-4 flex justify-between items-center">
      {/* Website Title */}
      <NavLink to="/">
        <h2 className="text-2xl font-semibold">Another Store</h2>
      </NavLink>
      {/* Navigation and Cart */}
      <nav className="flex items-center space-x-4">
        <a href="/" className="text-xl hover:scale-125">
          <IoHome />
        </a>
        <a href="/products" className="text-xl hover:scale-125">
          <RiDiscountPercentFill />
        </a>
        <button
          onClick={onToggleDark}
          className="h-8 rounded text-white dark:text-gray-800"
          aria-label="Toggle light/dark theme"
        >
          {darkMode ? (
            <MdWbSunny className="text-xl text-amber-500 hover:scale-125 cursor-pointer" />
          ) : (
            <BsMoonFill className="text-lg text-gray-500 hover:scale-125 cursor-pointer" />
          )}
        </button>
        <div className="relative ml-4">
          <button className="text-blue-900 pr-2 text-xl hover:scale-125 cursor-pointer">
            <FaHeart />
          </button>
          <NavLink to="/cart">
            <button className="text-rose-900 p-1 text-2xl hover:scale-125 cursor-pointer">
              <IoBagHandleSharp />
            </button>
            {/* Cart Counter */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-white bg-rose-900 font-semibold rounded-full text-xs px-1">
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
