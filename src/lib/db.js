import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "products.json");

export const readProducts = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
};

export const writeProducts = (products) => {
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify(products, null, 2)
    );
  } catch (error) {
    console.error("Error writing products:", error);
  }
};
