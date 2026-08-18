"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProductForm from "@/components/ProductForm";
import {
  getProduct,
  updateProduct,
} from "@/lib/api";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");

      await updateProduct(
        params.id,
        formData
      );

      router.push(`/products/${params.id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="text-red-500">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="mt-1 text-gray-500">
            Update product information.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {product && (
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            submitText={
              saving
                ? "Updating..."
                : "Update Product"
            }
          />
        )}

      </div>

    </main>
  );
}