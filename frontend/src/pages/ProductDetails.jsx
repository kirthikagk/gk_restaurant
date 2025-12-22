import { useLocation } from "react-router-dom";
import "./ProductDetails.css";   // ✅ CSS import here

const ProductDetails = () => {
  const { state } = useLocation();
  const product = state?.product;

  if (!product) return <p>No product data</p>;

  // Function to handle Buy Now click
  const handleBuyNow = () => {
    alert(`🎉 You bought ${product.name} for ₹${product.price}!`);
    // 👉 Later you can replace alert with navigation or API call
  };

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p className="price">Price: ₹{product.price}</p>
      <img src={`/uploads/${product.image}`} alt={product.name} />
      <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default ProductDetails;
