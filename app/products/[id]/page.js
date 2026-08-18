"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getProduct } from "@/lib/api";

export default function ProductDetailPage() {
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProduct(params.id);

      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>

        <Link
          href="/products"
          className="mt-4 inline-block"
        >
          ← Back to Products
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Product not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Product Details
            </h1>

            <p className="mt-1 text-gray-500">
              View product information
            </p>
          </div>

          <Link
            href="/products"
            className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
          >
            ← Back
          </Link>

        </div>

        {/* Product Card */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

          <div className="grid md:grid-cols-2">

            {/* Image */}
            <div className="bg-gray-50 p-8">
              <img
                src={product.image}
                alt={product.name}
                className="h-full max-h-[400px] w-full rounded-xl object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-8">

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                {product.category}
              </span>

              <h2 className="mt-4 text-3xl font-bold">
                {product.name}
              </h2>

              <p className="mt-4 text-gray-600">
                {product.description}
              </p>

              <div className="mt-8 space-y-5">

                <div>
                  <p className="text-sm text-gray-500">
                    Price
                  </p>

                  <p className="text-2xl font-bold">
                    ₹{product.price}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Stock
                  </p>

                  <p className="text-lg font-semibold">
                    {product.stock} units
                  </p>
                </div>

              </div>

              {/* Edit */}
              <Link
                href={`/products/${product.id}/edit`}
                className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
              >
                Edit Product
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}