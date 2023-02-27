import React from 'react';
import { useEffect, useState} from 'react';
import Background from '../components/Background';
import Gamebox from '../components/Gamebox';

function Dashboard() {
    return (
        <div className='h-[100vh] flex flex-col justify-center items-center' style={{"background": "linear-gradient(92.92deg, #1139CB -8.48%, #6B22A5 95.28%)"}}>
            <h1 class='text-white'>Welcome to your Dashboard!</h1>
            <div class='flex flex-col items-center'>
                <div class='flex flex-row space-x-12'>
                    <Gamebox/>
                    <Gamebox/>
                    <Gamebox/>
                </div>
                <div class='flex flex-row space-x-12'>
                    <Gamebox/>
                    <Gamebox/>
                    <Gamebox/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;