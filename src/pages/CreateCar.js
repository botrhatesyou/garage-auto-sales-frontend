// src/pages/CreateCar.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCar() {
  const [carData, setCarData] = useState({ make: '', model: '', year: '', price: '', description: '', imageUrl: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/cars', carData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => navigate('/admin'))
      .catch(error => console.error('Error creating car:', error));
  };

  return (
    <div>
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Make" value={carData.make} onChange={e => setCarData({ ...carData, make: e.target.value })} />
        <input type="text" placeholder="Model" value={carData.model} onChange={e => setCarData({ ...carData, model: e.target.value })} />
        <input type="number" placeholder="Year" value={carData.year} onChange={e => setCarData({ ...carData, year: e.target.value })} />
        <input type="number" placeholder="Price" value={carData.price} onChange={e => setCarData({ ...carData, price: e.target.value })} />
        <textarea placeholder="Description" value={carData.description} onChange={e => setCarData({ ...carData, description: e.target.value })}></textarea>
        <input type="text" placeholder="Image URL" value={carData.imageUrl} onChange={e => setCarData({ ...carData, imageUrl: e.target.value })} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCar;
