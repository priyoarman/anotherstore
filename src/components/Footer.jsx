/** This component renders the footer for each page on the app. */

import React from "react";

function Footer() {
  return (
    <footer className="text-center py-4 mt-8">
      <p className="text-yellow-900">
        © {new Date().getFullYear()} Another Store
      </p>
    </footer>
  );
}

export default Footer;
