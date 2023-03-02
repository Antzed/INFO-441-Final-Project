import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Background from './components/Background';
import { useEffect, useState} from 'react';


function App() {
  const [loggedIn, setLoggedin] = useState(false);

  useEffect(() => {
    fetch("api/users")
    .then(res => res.json())
    .then(data => {
        if(data.status === "loggedin") {
            setLoggedin(true);
        } else {
            setLoggedin(false);
        }
  })}, loggedIn);

  return (
    <div className="w-full h-full relative overflow-hidden bg-dark-text">
      <Router>
        <Navbar loggedIn={loggedIn}/>
        <Routes>
          {/* <Route path="/" element={<Landingpage/>}/> */}
          <Route path="/" element={<Dashboard loggedIn={loggedIn}/>} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
