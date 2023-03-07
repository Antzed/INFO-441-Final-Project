import React from 'react';
import { useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
    const [selectedGame, setSelectedGame] = useState("");

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
        // e.preventDefault();
        // e.stopPropagation();
        setSelectedGame(e.target.value);
        console.log(selectedGame)
    }
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
            className="flex flex-row items-center justify-between bg-transparent rounded-3xl p-4 w-1/5 h-2 border-2 border-white ml-[50%]">
            <input
              className="py-3 px-3 bg-transparent flex-1 outline-none "
              name="searchTextNav"
              placeholder="Search Game"
              onChange={(e) => handleSearch(e)}
            />
            <Link
              to={"/game/" + selectedGame}
              query={{ game: selectedGame }}
              form="search-form-nav"
              className="text-white scale-125 ">
              <FontAwesomeIcon icon={faSearch} />
            </Link>
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