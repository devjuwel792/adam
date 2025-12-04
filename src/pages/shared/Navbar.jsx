import { useState } from "react";
import { Link } from "react-scroll";
import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBook = () => {
    setIsMenuOpen(false); // Close menu on navigation
    navigate("/schedule");
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false); // Close menu on navigation
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="cursor-pointer flex-shrink-0"
          >
            <img src={logo} alt="" />
          </div>

          {/* Desktop Navigation & CTA */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center font-medium text-lg text-[#2c2c2c] gap-10">
              <NavLink to="/services">Services</NavLink>
              <Link
                to="why-choose"
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer"
              >
                Why Choose Us
              </Link>
              <NavLink to="/providers">For Providers</NavLink>
              <NavLink to="/about">About</NavLink>
            </nav>
            <button
              onClick={handleBook}
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-md font-medium"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center font-medium text-lg text-[#2c2c2c]">
            <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
            <Link
              to="why-choose"
              smooth={true}
              duration={500}
              offset={-80}
              onClick={closeMenu}
              className="cursor-pointer"
            >
              Why Choose Us
            </Link>
            <NavLink to="/providers" onClick={closeMenu}>For Providers</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <button
              onClick={handleBook}
              className="bg-amber-700 hover:bg-amber-800 text-white w-full mt-4 px-6 py-2 rounded-md font-medium"
            >
              Book Appointment
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
