"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getProducts, deleteProduct } from "@/lib/api";

import ProductFilters from "@/components/ProductFilters";
import ProductTable from "@/components/ProductTable";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/DeleteModal";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Delete
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (category) {
        params.append("category", category);
      }

      if (minPrice) {
        params.append("minPrice", minPrice);
      }

      if (maxPrice) {
        params.append("maxPrice", maxPrice);
      }

      params.append("page", page);
      params.append("limit", 5);

      const data = await getProducts(
        `?${params.toString()}`
      );

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    search,
    category,
    minPrice,
    maxPrice,
    page,
  ]);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      await deleteProduct(deleteId);

      setDeleteId(null);

      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchProducts();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your products
          </p>
        </div>

        <Link
          href="/products/add"
          className="rounded-lg bg-black px-5 py-3 text-center font-medium text-white hover:bg-gray-800"
        >
          + Add Product
        </Link>

      </div>

      {/* Filters */}
      <ProductFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        category={category}
        setCategory={(value) => {
          setCategory(value);
          setPage(1);
        }}
        minPrice={minPrice}
        setMinPrice={(value) => {
          setMinPrice(value);
          setPage(1);
        }}
        maxPrice={maxPrice}
        setMaxPrice={(value) => {
          setMaxPrice(value);
          setPage(1);
        }}
        onReset={handleReset}
      />

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center">
          <p className="text-gray-500">
            Loading products...
          </p>
        </div>
      ) : products.length === 0 ? (

        /* Empty */
        <div className="rounded-xl bg-white p-10 text-center">

          <h2 className="text-xl font-semibold">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <ProductTable
          products={products}
          onDelete={(id) => setDeleteId(id)}
        />

      )}

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteId !== null}
        deleting={deleting}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

    </main>
  );
}