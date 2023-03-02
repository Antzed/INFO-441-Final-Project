import React from 'react';
import { useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate  } from 'react-router-dom';

function Navbar(props) {

    let handleLogin = () => {
        console.log("logging in");
        window.location.href='signin';
    }

    let handleLogout = () => {
        console.log("logging out")
        window.location.href='signout';
    }

    return (
        <nav className="test-white py-4 fixed top-0 w-full z-[10]">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to='/'>
                    <div className='text-white px-8 text-xl'>GameDash.</div>
                </Link>
                <div>
                    {props.loggedIn
                    ? <button type="button" onClick={handleLogout} className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Logout</button>
                    : <button type="button" onClick={handleLogin} className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Login</button>
                }
                </div>
            </div>
        </nav>
    )
}
export default Navbar;