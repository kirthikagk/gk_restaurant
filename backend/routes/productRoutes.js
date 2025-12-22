import { Router } from "express";
import {
  getProducts,
  addProduct,
  removeProduct,
  getProduct,
  updateProduct,
} from "../controller/ProductController.js";

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.resolve(__dirname, "..", "..", "frontend", "public", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

const upload = multer({ storage, fileFilter });

const router = Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/get", getProducts);
router.get("/get/:id", getProduct);
router.put("/update/:id", upload.single("image"), updateProduct);
router.delete("/remove/:id", removeProduct);

export default router;
