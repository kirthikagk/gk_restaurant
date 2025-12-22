import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/backend/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProducts(data);
          setMessage("");
        } else {
          setProducts([]);
          setMessage(`Error: ${data.message}`);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <style>{`
        body {
          background-color: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .page-title {
          font-size: 1.75rem;
          font-weight: 300;
          letter-spacing: -0.5px;
          color: #1a1a1a;
          margin: 3rem 0 2.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .alert {
          border: none;
          border-left: 3px solid #dc3545;
          border-radius: 0;
          background-color: #fff5f5;
          color: #666;
          font-size: 0.9rem;
          padding: 1rem;
          margin-bottom: 2rem;
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .product-card {
          border: 1px solid #e8e8e8;
          border-radius: 2px;
          background: #ffffff;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        
        .product-card:hover {
          border-color: #d0d0d0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        
        .product-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-bottom: 1px solid #e8e8e8;
        }
        
        .product-body {
          padding: 1.25rem;
        }
        
        .product-title {
          font-size: 1rem;
          font-weight: 500;
          color: #1a1a1a;
          margin: 0 0 0.5rem;
          line-height: 1.4;
        }
        
        .product-description {
          font-size: 0.875rem;
          color: #757575;
          line-height: 1.5;
          margin: 0 0 0.75rem;
        }
        
        .product-price {
          font-size: 1.125rem;
          font-weight: 400;
          color: #1a1a1a;
          margin: 0;
        }
        
        .no-products {
          text-align: center;
          color: #999;
          font-size: 0.95rem;
          padding: 3rem 0;
          font-weight: 300;
        }
        
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .page-title {
            font-size: 1.5rem;
            margin: 2rem 0 1.5rem;
          }
        }
      `}</style>
      
      <div className="container">
        <h1 className="page-title">Products</h1>
        
        {message && (
          <div className="alert">
            {message}
          </div>
        )}
        
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <img
                  className="product-image"
                  src={
                  product.image
                    ? `/uploads/${product.image}`
                    : "https://via.placeholder.com/400x300/f5f5f5/999999?text=No+Image"
                }
                alt={product.title}
                />
                <div className="product-body">
                  <h2 className="product-title">{product.title}</h2>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">₹{product.price}</p>
                
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">No products available</p>
        )}
      </div>
    </>
  );
};

export default HomePage;