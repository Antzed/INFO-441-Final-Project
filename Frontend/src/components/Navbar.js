import React from 'react';
import { useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ResultItem from "./ResultItem";


function Navbar(props) {
    const [selectedGame, setSelectedGame] = useState("");
    const [result , setResult] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    let handleLogin = () => {
        console.log("logging in");
        window.location.href='signin';
    }

    let handleLogout = () => {
        console.log("logging out")
        window.location.href='signout';
    }

    let handleBackToHome = () => {
        console.log("back to home");
        window.location.href='/';
    }

    let handleToUserDashboard = () => {
        console.log("to user dashboard");
        window.location.href='/user';
    }

    let handleSearch = (e) => {
        setShowDropdown(e.target.value.length > 0);
        setSelectedGame(e.target.value);
        fetch(`api/games/?search=${encodeURIComponent(e.target.value)}`)
        .then(res => res.json())
        .then(data => {setResult(data)})
        .catch(err => console.log(err));
        
    }

    let handleDropdownChange = (e) => {
      const value = e.target.value
      setSelectedGame(value)
      setShowDropdown(false);
    };
    return (
      <nav className="test-white py-4 fixed top-0 w-full z-[10] backdrop-blur-md">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/">
            <div className="text-white px-8 text-xl" onClick={handleBackToHome}>
              GameDash.
            </div>
          </Link>
          
          <form
            id="search-form-nav"
            className="flex flex-column items-center justify-between bg-transparent rounded-3xl p-4 w-1/5 h-2 border-2 border-white ml-[50%]"
          >
            <div style={{position: "relative"}}>
            <input
              className="py-3 px-3 bg-transparent flex-1 outline-none "
              name="searchTextNav"
              placeholder="Search Game"
              onChange={(e) => handleSearch(e)}
              value={selectedGame}
            />
            {showDropdown && (
              <div style={{ position: "absolute", top: "100%", left: 0, overflow: "visible", zIndex: 3, width: "100%", backgroundColor: "white" }}>
              <select onChange={handleDropdownChange} value="options" size={result.length} style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                color: "black"
              }}>
                {result.map(game => {return <option key={game} value={game} style={{color: "black"}}>{game}</option>})}
              </select>
              </div>
            )}
            
            <Link
              to={"/" + selectedGame}
              query={{ game: selectedGame }}
              form="search-form-nav"
              className="text-white scale-125 ">
              <FontAwesomeIcon icon={faSearch} />
            </Link>
            </div>
          </form>
          
          <div>
            {props.loggedIn ? (
              <div className="flex">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                  Logout
                </button>
                <button
                  type="button"
                  onClick={handleToUserDashboard}
                  className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                  Your dashboard
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
}
export default Navbar;