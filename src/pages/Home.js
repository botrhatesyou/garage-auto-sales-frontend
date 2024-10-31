import { Link } from 'react-router-dom';
import './Home.css';  // Assuming we use a separate CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Garage Auto Sales</h1>
        <p>Your trusted partner in finding the perfect car.</p>
        <p>Explore our exclusive collection of high-quality vehicles at unbeatable prices.</p>
        <Link to="/inventory">
          <button className="btn-primary">Browse Inventory</button>
        </Link>
      </header>

      <section className="highlights">
        <div className="highlight-card">
          <h3>Wide Selection</h3>
          <p>We offer a variety of cars, from sedans to SUVs, ensuring you find the perfect fit for your needs.</p>
        </div>
        <div className="highlight-card">
          <h3>Unmatched Quality</h3>
          <p>All of our vehicles are inspected and maintained to meet the highest standards.</p>
        </div>
        <div className="highlight-card">
          <h3>Competitive Pricing</h3>
          <p>Enjoy excellent deals and competitive prices on all our cars.</p>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Looking for your next ride?</h2>
        <p>Visit Garage Auto Sales and drive away in your dream car today.</p>
        <Link to="/inventory">
          <button className="btn-secondary">See All Cars</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
