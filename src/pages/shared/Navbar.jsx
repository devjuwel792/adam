import { Link } from "react-scroll";
import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/schedule");
  };
  return (
    <header className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div onClick={() => navigate("/")}>
            <img src={logo} alt="" />
          </div>

          {/* Navigation */}
          <nav className="flex items-center font-medium text-lg text-[#2c2c2c] gap-10">
            <NavLink to="/services" className="">
              Services
            </NavLink>
            <Link
              to="why-choose"
              smooth={true}
              duration={500}
              offset={-80} // (optional) navbar height adjust করার জন্য
            >
              Why Choose Us
            </Link>
            <NavLink to="/providers" className="">
              For Providers
            </NavLink>
            <NavLink to="/about" className="">
              About
            </NavLink>
          </nav>

          {/* CTA Button */}
          <button
            onClick={handleBook}
            className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-md font-medium"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
}
