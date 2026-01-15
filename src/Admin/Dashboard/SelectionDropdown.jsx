"use client";

import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";

// Status color helper
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-[#eab308]"; // yellow
    case "active":
      return "bg-[#22c55e]"; // green
    case "draft":
      return "bg-[#F87171]"; // red
    case "published":
      return "bg-[#3b82f6]"; // blue (example)
    case "approved":
      return "bg-[#16a34a]"; // dark green
    case "deny":
      return "bg-[#dc2626]"; // dark red
    default:
      return "bg-gray-300";
  }
};

// Capitalize helper
const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const SelectionDropdown = ({ options = [], selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside handle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 text-white text-sm rounded-md ${
          selected ? getStatusColor(selected) : "bg-[#C9A14A]"
        }`}
      >
        {selected ? capitalize(selected) : "Select"}
        <FaAngleDown />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-black ${getStatusColor(
                option
              )} text-white`}
            >
              {capitalize(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionDropdown;
