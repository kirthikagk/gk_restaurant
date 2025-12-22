import { useNavigate } from "react-router-dom";
import "../pages/AdminDashboard.css";
import { useState } from "react";

const Navbar = () => {
  const [product, setProduct] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!product) return;

    try {
      const res = await fetch(`/api/backend/get/${product}`);
      if (!res.ok) throw new Error("Product not found");

      const data = await res.json();
      navigate(`/product/${data._id}`, { state: { product: data } });
    } catch (err) {
      console.error(err);
      alert("Product not found!");
    }
  };

  return (
    <div className="navbar-container">
      <h1 className="brand">🍴  GK's Restaurant</h1>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search your favorite dish..."
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="search-input"
        />
        <button className="btn search-btn" onClick={handleSearch}>🔍 Search</button>
        <button className="btn add-btn" onClick={() => navigate("/add")}>➕ Add</button>
        <button className="btn update-btn" onClick={() => navigate("/update")}>✏️ Update</button>
      </div>
    </div>
  );
};

export default Navbar;
