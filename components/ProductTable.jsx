"use client";

import Link from "next/link";

export default function ProductTable({
  products,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="border-b bg-gray-50">
            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Stock
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >

                {/* Product */}
                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.name}
                      </p>

                      <p className="max-w-xs truncate text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Category */}
                <td className="px-6 py-5">

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {product.category}
                  </span>

                </td>

                {/* Price */}
                <td className="px-6 py-5 font-medium">
                  ₹{product.price}
                </td>

                {/* Stock */}
                <td className="px-6 py-5">
                  {product.stock}
                </td>

                {/* Actions */}
                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      View
                    </Link>

                    <Link
                      href={`/products/${product.id}/edit`}
                      className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => onDelete(product.id)}
                      className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}