import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import CarDetails from './pages/CarDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditCar from './pages/AdminEditCar';
import AdminCreateCar from './pages/AdminCreateCar';
import AdminLogin from './pages/AdminLogin';  // Import the AdminLogin component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit-car/:id" element={<AdminEditCar />} />
        <Route path="/admin/create-car" element={<AdminCreateCar />} />
        <Route path="/login" element={<AdminLogin />} />  {/* Add login route */}
      </Routes>
    </Router>
  );
}

export default App;
