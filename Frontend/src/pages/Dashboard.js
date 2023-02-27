import React from 'react';
import { useEffect, useState} from 'react';
import Background from '../components/Background';
import Gamebox from '../components/Gamebox';

function Dashboard() {
    return (
        <div>
            <h1 class='text-white'>Welcome to your Dashboard!</h1>
            <div class='flex-col'>
                <div class='flex-row'>
                    <Gamebox/>
                    <Gamebox/>
                    <Gamebox/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;