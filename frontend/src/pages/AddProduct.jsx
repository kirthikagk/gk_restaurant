import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("price", price);

      const res = await fetch("/api/backend/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Product added successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        setPrice("");
        // Reset file input
        document.getElementById("formImage").value = "";
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

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
          max-width: 600px;
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
          border-left: 3px solid #28a745;
          border-radius: 0;
          background-color: #f0f9f4;
          color: #666;
          font-size: 0.9rem;
          padding: 1rem;
          margin-bottom: 2rem;
        }
        
        .alert.error {
          border-left-color: #dc3545;
          background-color: #fff5f5;
        }
        
        .form-container {
          background: #ffffff;
          border: 1px solid #e8e8e8;
          border-radius: 2px;
          padding: 2rem;
          margin-bottom: 3rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
          letter-spacing: 0.3px;
        }
        
        .form-control {
          width: 100%;
          padding: 0.75rem;
          font-size: 0.9rem;
          color: #1a1a1a;
          background-color: #fafafa;
          border: 1px solid #e0e0e0;
          border-radius: 2px;
          transition: all 0.2s ease;
          box-sizing: border-box;
          font-family: inherit;
        }
        
        .form-control:focus {
          outline: none;
          background-color: #ffffff;
          border-color: #1a1a1a;
        }
        
        .form-control::placeholder {
          color: #999;
        }
        
        textarea.form-control {
          resize: vertical;
          min-height: 100px;
        }
        
        .form-control[type="file"] {
          padding: 0.5rem 0.75rem;
          cursor: pointer;
        }
        
        .form-control[type="file"]::file-selector-button {
          padding: 0.5rem 1rem;
          margin-right: 1rem;
          background-color: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 2px;
          color: #1a1a1a;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .form-control[type="file"]::file-selector-button:hover {
          background-color: #e8e8e8;
        }
        
        .submit-btn {
          width: 100%;
          padding: 0.875rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #ffffff;
          background-color: #1a1a1a;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.5px;
          margin-top: 0.5rem;
        }
        
        .submit-btn:hover {
          background-color: #333333;
        }
        
        .submit-btn:active {
          transform: translateY(1px);
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.5rem;
            margin: 2rem 0 1.5rem;
          }
          
          .form-container {
            padding: 1.5rem;
          }
        }
      `}</style>
      
      <div className="container">
        <h1 className="page-title">Add New Product</h1>
        
        {message && (
          <div className={`alert ${message.includes('Error') ? 'error' : ''}`}>
            {message}
          </div>
        )}
        
        <div className="form-container">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label className="form-label" htmlFor="formTitle">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formTitle"
                placeholder="Enter product name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formDescription">
                Description
              </label>
              <textarea
                className="form-control"
                id="formDescription"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formImage">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="formImage"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="formPrice">
                Price (₹)
              </label>
              <input
                type="number"
                className="form-control"
                id="formPrice"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Product
            </button>
            <button onClick={() => navigate('/home')} className="submit-btn">
              View Products
            </button>
            
          </form>
        </div>
      </div>
      
    </>
  );
};

export default AddProduct;