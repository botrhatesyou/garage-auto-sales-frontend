import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inventory.css';

function Inventory() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/cars`)
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  return (
    <div className="inventory-container">
      <h1>Car Inventory</h1>
      <div className="car-grid">
        {cars.map(car => (
          <div className="car-card" key={car.id}>
            {car.imageUrls.length > 0 ? (
              <img src={car.imageUrls[0]} alt={`${car.make} ${car.model}`} className="car-image" />
            ) : (
              <img src="/placeholder-image.png" alt="Placeholder" className="car-image" />
            )}
            <div className="car-info">
              <h2>{car.make} {car.model}</h2>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Price:</strong> ${car.price}</p>
              <p><strong>Mileage:</strong> {car.mileage} km</p>
              <Link to={`/cars/${car.id}`}>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
