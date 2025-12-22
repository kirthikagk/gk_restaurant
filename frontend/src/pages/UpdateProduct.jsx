import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Update.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/backend/get/${id}`);
        if (res.status === 404) {
          setError("Product not found");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          image: null,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      const res = await fetch(`/api/backend/update/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error("Update failed");
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="loading">Loading product...</p>;

  return (
    <div className="update-container">
      <div className="update-card">
        <h2 className="update-title">✏️ Update Product</h2>
        {error && <p className="alert error">{error}</p>}

        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label>Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="update-btn">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;