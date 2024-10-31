import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';  // Import the CSS file for styling

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Get token from localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token
    navigate('/login');  // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Garage Auto Sales</Link> {/* You can add a logo or title */}
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>

        {/* Show Admin link only if the admin is logged in */}
        {token && (
          <>
            <li><Link to="/admin">Admin</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>  {/* Logout button */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
