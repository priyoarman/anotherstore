/** This component renders the footer for each page on the app. */

import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-white to-0% text-center py-4 mt-8">
      <p className="text-gray-500">
        © {new Date().getFullYear()} Another Store
      </p>
    </footer>
  );
}

export default Footer;
