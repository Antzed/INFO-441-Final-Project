import React from 'react';

import Gamebox from '../components/Gamebox';
// 
function Dashboard() {
    return (
      <div
        className="h-screen w-screen relative flex flex-col justify-center items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(92.92deg, #1139CB -8.48%, #6B22A5 95.28%)",
        }}>
        <img
          className="absolute max-w-[100%] left-[40%] lg:top-[-70%] z-[1]"
          src="/background.png"
          alt="asdf"
        />
        <div className="z-[2]">
          <h1 class="text-white">Welcome to your Dashboard!</h1>
          <div class="flex flex-col items-center">
            <div class="flex flex-row space-x-12">
              <Gamebox />
              <Gamebox />
              <Gamebox />
            </div>
            <div class="flex flex-row space-x-12">
              <Gamebox />
              <Gamebox />
              <Gamebox />
            </div>
          </div>
        </div>
      </div>
    );
}
export default Dashboard;