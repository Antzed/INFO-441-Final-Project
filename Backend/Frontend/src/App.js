import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Background from './components/Background';


function App() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-dark-text">
      <Router>
        <Navbar/>
        <Routes>
          {/* <Route path="/" element={<Landingpage/>}/> */}
          <Route path="/" element={<Dashboard/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
