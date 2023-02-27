import React from 'react';

function Gamebox() {
    //todo display picture of game if selected if not add a plus sign
    return(
        <div class='flex flex-col w-80 h-52 rounded-lg overflow-hidden my-6'>
            <div class='flex w-full h-2/3 bg-dark-grey plcae-content-center'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 stroke-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </div>
            </div>
            <div class='w-full h-1/3 font-bold bg-dark-text text-white text-xl p-4'>GAME OF THE YEAR</div>
        </div>
    )
}

export default Gamebox;