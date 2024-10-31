import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem('token');  // Get token from localStorage
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login');  // Redirect to login if no token
    }
  }, [token, navigate]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/cars`, {
      headers: { Authorization: `Bearer ${token}` }
   })   
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  }, [token]);

  const deleteCar = (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (confirmDelete) {
      axios.delete(`${process.env.REACT_APP_API_URL}/api/cars`, {
        headers: { Authorization: `Bearer ${token}` }
     })
        .then(() => setCars(cars.filter(car => car.id !== id)))
        .catch(error => console.error('Error deleting car:', error));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <Link to="/admin/create-car">
          <button className="add-car-button">Add New Car</button>
        </Link>
      </div>
      <ul className="car-list">
        {cars.map(car => (
          <li key={car.id} className="car-card">
            <div className="car-details">
              <h3>{car.make} {car.model}</h3>
              <p><strong>Price:</strong> ${car.price}</p>
            </div>
            <div className="button-group">
              <Link to={`/admin/edit-car/${car.id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button onClick={() => deleteCar(car.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
