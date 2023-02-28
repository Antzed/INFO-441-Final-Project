import React from 'react';
import { useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate  } from 'react-router-dom';

function Navbar() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Access-Control-Allow-Origin': 'http://localhost:9000',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'responseType': 'json',
        },
    };

    const [loggedIn, setLoggedin] = useState(false);

    let navigate = useNavigate();
    // let navigate = useNavigate();
    let handleLogin = () => {
        // redirect to https://localhost:3000/signin
        console.log("logging in");
        // redirect to https://localhost:9000/signin
        navigate('/signin');

        // console.log("logging in");
        
    }

    let handleLogout = () => {
        console.log("logging out")
        fetch("http://localhost:3000/signout", requestOptions)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch("api/session")
        .then(res => {
            let response = res.json()
            if (response.isAuthenticated) {
                console.log("logged in")
                setLoggedin(true)
            }
            console.log(loggedIn)
        })
        .catch(err => console.log(err))
    })


    return (
        <nav className="test-white py-4 fixed top-0 w-full z-[10]">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to='/'>
                    <div className='text-white px-8 text-xl'>GameDash.</div>
                </Link>
                <div>
                    {loggedIn
                    ? <button type="button" onClick={handleLogout} className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Logout</button>
                    : <button type="button" onClick={handleLogin} className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Login</button>
                }
                </div>
            </div>
        </nav>
    )
}
export default Navbar;