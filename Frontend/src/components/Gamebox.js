import React from 'react';

function Gamebox() {
    //todo display picture of game if selected if not add a plus sign
    return(
        <div class='flex-col rounded w-8 h-8'>
            <div class='w-full h-2/3 bg-small-test-01'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
        </div>
            <div class='w-full h-1/3 font-bold bg-dark-text'>GAME OF THE YEAR</div>
        </div>
    )
}

export default Gamebox;