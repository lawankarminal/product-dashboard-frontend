"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onReset,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        {/* Reset */}
        <button
          onClick={onReset}
          className="rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50"
        >
          Reset
        </button>

      </div>
    </div>
  );
}