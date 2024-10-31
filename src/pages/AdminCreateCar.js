import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';  // Assuming we add a new CSS file for admin styles

function AdminCreateCar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    description: ''
  });
  const [images, setImages] = useState([]);  // State to store multiple images

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();
    formDataObj.append('car', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    images.forEach((image) => {
      formDataObj.append('images', image);
    });

    axios.post(`${process.env.REACT_APP_API_URL}/api/cars`, formDataObj, {
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
      }
   })   
    .then(response => {
      navigate('/admin');
    })
    .catch(error => {
      console.error('Error creating car:', error);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages([...images, ...selectedFiles].slice(0, 5));  // Limit to 5 images
  };

  const handleImageDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-panel">
      <h1>Add New Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h2>Car Information</h2>
          <div className="form-group">
            <label>Make</label>
            <input type="text" name="make" value={formData.make} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Mileage</label>
            <input type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="section">
          <h2>Upload Images (Max 5)</h2>
          <input type="file" name="images" onChange={handleImageChange} accept="image/*" multiple />
          <div className="image-preview">
            {images.map((image, index) => (
              <div key={index} className="preview-item">
                <span>{image.name}</span>
                <button type="button" onClick={() => handleImageDelete(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="primary-button">Create Car</button>
      </form>
    </div>
  );
}

export default AdminCreateCar;
