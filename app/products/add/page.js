"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/lib/api";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      await createProduct(formData);

      router.push("/products");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Add Product
          </h1>

          <p className="mt-1 text-gray-500">
            Add a new product to your inventory.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <ProductForm
          onSubmit={handleSubmit}
          submitText={
            loading ? "Adding..." : "Add Product"
          }
        />

      </div>

    </main>
  );
}