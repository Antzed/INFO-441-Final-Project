import React, { useState, useEffect } from "react";

import Gamebox from "../components/Gamebox";
import GameSearch from "../components/GameSearch";
//
function Dashboard(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [catagoryName, setCatagoryName] = useState("");
  const [categories, setCategories] = useState([]);




  if (categories.length === 0) {
    fetch("api/games/category")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setCategories(data);}}
      )
      .catch(err => console.log(err));
  }

  function handleClear(){
    fetch("api/users/clear")
    .then(res => res.json())
    .then(data => {
    })
    //reaload the page
    window.location.reload();
  }

  


  
  return (
    <>
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
          {props.loggedIn ? (
            <div className="flex">
              <h1 className="text-white justify-start flex-grow">Welcome to your Dashboard!</h1>
              <div className="w-auto p-2 flex justify-end text-center items-center Btn border-2 border-white rounded-2xl font-bold hover:bg-white hover:text-dark-text transition duration-100" onClick={handleClear}>
                Clear
              </div>
            </div>
          
          )
          : (<h1 className="text-white">Welcome to the Game Dash!</h1>)}
          
          <div className="flex flex-col items-center">
            <div className="flex flex-row space-x-12">
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Favorite game"}
                category = {categories.find(element => element.name === "Favorite game")}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Most played game"}
                category = {categories.find(element => element.name === "Most played game")}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Definitely recommend"}
                category = {categories.find(element => element.name === "Definitely recommend")}
                loggedIn={props.loggedIn}
              />
            </div>
            <div className="flex flex-row space-x-12">
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Always wanted to play"}
                category = {categories.find(element => element.name === "Always wanted to play")}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Rare gem"}
                category = {categories.find(element => element.name === "Rare gem")}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Game of the year"}
                category = {categories.find(element => element.name === "Game of the year")}
                loggedIn={props.loggedIn}
              />
            </div>
          </div>
        </div>
      </div>
      {showSearch ? (
        <GameSearch setShowSearch={setShowSearch} setCatagoryName={setCatagoryName} catagoryName={catagoryName}/>
      ) : (
        <></>
      )}
    </>
  );
}
export default Dashboard;
