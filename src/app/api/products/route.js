import { readProducts, writeProducts } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    let products = readProducts();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 5;

    // Search
    if (search) {
      products = products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      products = products.filter(
        (product) => product.category === category
      );
    }

    // Price filters
    if (minPrice) {
      products = products.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice) {
      products = products.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    // Pagination
    const currentPage = Number(page);
    const itemsPerPage = Number(limit);
    const totalProducts = products.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return NextResponse.json({
      products: paginatedProducts,
      totalProducts,
      totalPages: Math.ceil(totalProducts / itemsPerPage),
      currentPage,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, price, category, stock, image } =
      await request.json();

    // Validate required fields
    if (!name?.trim() || !description?.trim() || !category?.trim() || !image?.trim()) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate price
    if (price === undefined || price === "") {
      return NextResponse.json(
        { message: "Price is required" },
        { status: 400 }
      );
    }

    if (Number(price) <= 0) {
      return NextResponse.json(
        { message: "Price must be greater than 0" },
        { status: 400 }
      );
    }

    // Validate stock
    if (stock === undefined || stock === "") {
      return NextResponse.json(
        { message: "Stock is required" },
        { status: 400 }
      );
    }

    if (Number(stock) < 0) {
      return NextResponse.json(
        { message: "Stock cannot be negative" },
        { status: 400 }
      );
    }

    const products = readProducts();

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      stock: Number(stock),
      image: image.trim(),
    };

    products.push(newProduct);
    writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}
