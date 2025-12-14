import { Phone, Mail, MapPin } from "lucide-react";
import logo from "../../assets/images/logo.png";
import fb from "../../assets/images/fb.png";
import tweet from "../../assets/images/tweet.png";
import linkedin from "../../assets/images/linkedin.png";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
            <img src={logo} alt="Primepath Logo" className="h-10 mb-4" />
            <p className="text-base mb-4 pr-4">
            Professional home blood testing services with certified healthcare
            professionals.
          </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <img src={fb} alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src={tweet} alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={linkedin} alt="LinkedIn" className="h-6 w-6" />
              </a>
          </div>
        </div>

        {/* Services */}
        <div className="text-base">
            <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Blood Tests</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Panels</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diabetes Testing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lipid Profile</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-base">
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
            <li>
                <NavLink to="/about" className="hover:text-white transition-colors">
                About Us
              </NavLink>
            </li>
            <li>
                <NavLink to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </NavLink>
            </li>
            <li>
                <NavLink to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-base">
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
                <a href="tel:555-123-4567" className="hover:text-white transition-colors">(555) 123-4567</a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
                <a href="mailto:info@venixlab.com" className="hover:text-white transition-colors">info@venixlab.com</a>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Available in major cities</span>
            </li>
          </ul>
        </div>
      </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-700 text-center text-base text-[#9CA3AF]">
        © 2025 VeniX Lab. All rights reserved.
      </div>
    </footer>
  );
}
