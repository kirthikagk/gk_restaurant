import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../static/css/ProductCard.css";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Delete product by _id
  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`/api/backend/remove/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage("Product Deleted");
        setProducts((prev) => prev.filter((p) => p._id !== _id));
      } else {
        setMessage("Couldn't Delete Product Now");
      }
    } catch (error) {
      setMessage("Server Error: " + error.message);
    }
  };

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/backend/get`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!data || data.length === 0) {
          setMessage("No products found");
        } else {
          setProducts(data);
        }
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Products</h1>
      {message && <div className="alert">{message}</div>}

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              <img
                className="product-image"
                src={
                  p.image
                    ? `/uploads/${p.image}`
                    : "https://via.placeholder.com/400x300/f5f5f5/999999?text=No+Image"
                }
                alt={p.title}
              />
              <div className="product-body">
                <h2 className="product-title">{p.title}</h2>
                <p className="product-description">{p.description}</p>
                <p className="product-price">₹{p.price}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>

                <Link to={`/update/${p._id}`}>
                  <button className="update-btn">Update</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products available</p>
      )}
    </div>
  );
};

export default ProductCard;
