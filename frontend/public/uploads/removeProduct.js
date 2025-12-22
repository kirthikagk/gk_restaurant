import productModel from "../modules/productModel.js";
import fs from "fs";
import path from "path";

export const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Find the product first
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Delete image from uploads folder
    if (product.image) {
      const imagePath = path.resolve("frontend/public/uploads", product.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 3️⃣ Delete from database
    await productModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product removed successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};