import React from 'react';
import { useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="test-white py-4 fixed top-0 w-full">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to='/'>
                    <div className='text-white'>GameDash.</div>
                </Link>
                <button type="button" className="focus:outline-none text-white bg-accent-orange hover:bg-amber-500 focus:ring-4 focus:ring-accent-orange font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Login</button>
            </div>
        </nav>
    )
}
export default Navbar;