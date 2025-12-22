import productModel from "../modules/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found !!!" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = await productModel.create({
      title,
      description,
      image,
      price,
    });

    res.status(200).json({ message: "Product Added Successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json("Cannot remove product");
    }
    res.status(200).json("Product removed successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const updateData = { title, description, price };
    if (image) updateData.image = image;

    const product = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
