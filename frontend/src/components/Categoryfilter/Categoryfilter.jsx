"use client";

import React, { useState, useRef, useEffect } from "react";

const CategoryFilter = () => {
  const categories = [
    "All",
    "Conference",
    "Workshop",
    "Summit",
    "Keynote",
    "Panel",
    "Meetup",
    "Hackathon",
  ];

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category) => {
    setActiveCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-2">
      <div className="flex flex-col  md:items-center justify-between gap-4">
         
        <h2 className="text-lg font-bold text-primary shrink-0">
          Filter by Category
        </h2>
 
        <div className="relative md:hidden " ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-2  py-1 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <span>{activeCategory}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
 
          {isOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <ul className="max-h-60 overflow-y-auto">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleSelect(category)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors
                        ${
                          activeCategory === category
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        
        <div className="hidden md:flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                ${
                  activeCategory === category
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;