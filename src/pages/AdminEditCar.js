import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

function AdminEditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    description: '',
    mileage: '',
    imageUrls: []
  });
  const [newImages, setNewImages] = useState([]);  // New images for upload

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_API_URL}/api/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const carData = response.data;
      carData.imageUrls = carData.imageUrls || [];
      setFormData(carData);
    })
    .catch(error => console.error('Error fetching car details:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();
    formDataObj.append('car', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    if (newImages.length > 0) {
      newImages.forEach(image => formDataObj.append('images', image));
    }

    axios.put(`${process.env.REACT_APP_API_URL}/api/cars/${id}`, formDataObj, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Car updated:', response.data);
      navigate('/admin');
    })
    .catch(error => {
      console.error('Error updating car:', error);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewImages([...newImages, ...selectedFiles].slice(0, 5));
  };

  const handleNewImageDelete = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleExistingImageDelete = (imageUrl) => {
    const token = localStorage.getItem('token');
    axios.put(`${process.env.REACT_APP_API_URL}/api/cars/${id}/delete-image`, { imageUrl }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log('Image deleted:', response.data);
      setFormData(response.data);
    })
    .catch(error => {
      console.error('Error deleting image:', error);
    });
  };

  return (
    <div className="admin-panel">
      <h1>Edit Car</h1>
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
          <h2>Existing Images</h2>
          <div className="image-preview">
            {formData.imageUrls.length > 0 ? (
              formData.imageUrls.map((url, index) => (
                <div key={index} className="preview-item">
                  <img src={url} alt={`Car ${index}`} width="100" />
                  <button type="button" className="danger-button" onClick={() => handleExistingImageDelete(url)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No images uploaded yet.</p>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Upload New Images (optional, max 5)</h2>
          <input type="file" name="images" onChange={handleImageChange} accept="image/*" multiple />
          <div className="image-preview">
            {newImages.map((image, index) => (
              <div key={index} className="preview-item">
                <span>{image.name}</span>
                <button type="button" className="danger-button" onClick={() => handleNewImageDelete(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="primary-button">Update Car</button>
      </form>
    </div>
  );
}

export default AdminEditCar;
