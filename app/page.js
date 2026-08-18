"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getProducts } from "@/lib/api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(
          "?page=1&limit=1000"
        );

        setProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (total, product) =>
      total + product.price * product.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock < 10
  ).length;

  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Overview of your product inventory
          </p>
        </div>

        <Link
          href="/products/add"
          className="rounded-lg bg-black px-5 py-3 text-center font-medium text-white hover:bg-gray-800"
        >
          + Add Product
        </Link>

      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        {/* Total Products */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalProducts}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Products in inventory
          </p>
        </div>

        {/* Inventory Value */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Inventory Value
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹{totalValue.toLocaleString("en-IN")}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Price × stock
          </p>
        </div>

        {/* Low Stock */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Low Stock
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {lowStockProducts}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Products below 10 units
          </p>
        </div>

        {/* Categories */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Categories
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {categories.length}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Product categories
          </p>
        </div>

      </div>

      {/* Recent Products */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Recent Products
            </h2>

            <p className="text-sm text-gray-500">
              Products currently in your inventory
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-medium hover:underline"
          >
            View all →
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b bg-gray-50">
              <tr>

                <th className="px-4 py-3 text-left text-sm">
                  Product
                </th>

                <th className="px-4 py-3 text-left text-sm">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-sm">
                  Price
                </th>

                <th className="px-4 py-3 text-left text-sm">
                  Stock
                </th>

              </tr>
            </thead>

            <tbody>
              {products
                .slice(0, 5)
                .map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-0"
                  >

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />

                        <span className="font-medium">
                          {product.name}
                        </span>

                      </div>
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {product.category}
                    </td>

                    <td className="px-4 py-4">
                      ₹{product.price}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={
                          product.stock < 10
                            ? "font-medium text-red-600"
                            : "text-gray-700"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>

                  </tr>
                ))}
            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}