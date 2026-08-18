import { readProducts, writeProducts } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const products = readProducts();
    const product = products.find(
      (p) => p.id === Number(params.id)
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { name, description, price, category, stock, image } =
      await request.json();

    const products = readProducts();
    const index = products.findIndex(
      (p) => p.id === Number(params.id)
    );

    if (index === -1) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

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

    products[index] = {
      ...products[index],
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      stock: Number(stock),
      image: image.trim(),
    };

    writeProducts(products);

    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const products = readProducts();
    const filteredProducts = products.filter(
      (p) => p.id !== Number(params.id)
    );

    if (products.length === filteredProducts.length) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    writeProducts(filteredProducts);

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
