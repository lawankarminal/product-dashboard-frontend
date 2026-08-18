import { readProducts } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = readProducts();
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
