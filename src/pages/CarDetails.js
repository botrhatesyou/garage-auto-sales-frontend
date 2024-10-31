import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './CarDetails.css';

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/cars/${id}`)
      .then(response => setCar(response.data))
      .catch(error => console.error('Error fetching car details:', error));
  }, [id]);

  const handleShowContactInfo = () => {
    setShowContactInfo(true);
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="car-details-wrapper">
      <div className="car-details-header">
        <h1>{car.make} {car.model} - {car.year}</h1>
      </div>

      <div className="car-details-content">
        <div className="car-images-carousel">
          {car.imageUrls.length > 0 ? (
            <Carousel
              showThumbs={false}
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              dynamicHeight={true}
            >
              {car.imageUrls.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`${car.make} ${car.model}`} />
                </div>
              ))}
            </Carousel>
          ) : (
            <img src="/placeholder-image.png" alt="Placeholder" className="car-placeholder" />
          )}
        </div>

        <div className="car-details-info">
          <p><strong>Price:</strong> ${car.price}</p>
          <p><strong>Mileage:</strong> {car.mileage} km</p>
          <p><strong>Description:</strong> {car.description}</p>
          <button onClick={handleShowContactInfo} className="contact-button">Contact for Test Drive</button>
          {showContactInfo && (
            <p className="test-drive-info">Contact Number: (123) 456-7890</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
