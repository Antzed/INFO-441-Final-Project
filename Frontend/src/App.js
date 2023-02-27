import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Background from './components/Background';

function App() {
  return (
    <div class="w-full h-full bg-gradient-to-b from-blue-400 to-blue-500">
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
