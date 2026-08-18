"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";

export default function ProductForm({
  onSubmit,
  initialData = {},
  submitText = "Add Product",
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category: initialData.category || "",
    stock: initialData.stock || "",
    image: initialData.image || "",
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price =
        "Price must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.stock === "") {
      newErrors.stock = "Stock is required";
    } else if (Number(formData.stock) < 0) {
      newErrors.stock =
        "Stock cannot be negative";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
    >

      {/* Product Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description}
          </p>
        )}
      </div>

      {/* Price + Stock */}
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          {errors.stock && (
            <p className="mt-1 text-sm text-red-500">
              {errors.stock}
            </p>
          )}
        </div>

      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          <option value="">
            Select category
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

        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category}
          </p>
        )}
      </div>

      {/* Image */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Image URL
        </label>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        {errors.image && (
          <p className="mt-1 text-sm text-red-500">
            {errors.image}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border px-5 py-3 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
        >
          {submitText}
        </button>

      </div>

    </form>
  );
}