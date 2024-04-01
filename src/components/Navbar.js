import React from "react";
import logo from "../assets/img/gymlogo.png";

function Navbar() {
  const sideClick = () => {
    if (
      document
        .getElementById("logo-sidebar")
        .classList.contains("-translate-x-full")
    ) {
      document
        .getElementById("logo-sidebar")
        .classList.remove("-translate-x-full");
    } else {
      document
        .getElementById("logo-sidebar")
        .classList.add("-translate-x-full");
    }
  };
  return (
    <header className="">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
             
          
                <img src={logo} className="h-14  mr-3" alt=" Logo" />
                <span className="self-center text-lg font-semibold sm:text-xl whitespace-nowrap font-sans">
                  AESTHETIC FITNESS
                </span>
              
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
