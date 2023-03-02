import React, { useState, useEffect } from "react";

import Gamebox from "../components/Gamebox";
import GameSearch from "../components/GameSearch";
//
function Dashboard(props) {
  const [showSearch, setShowSearch] = useState(false);
  console.log(showSearch);
  const [catagoryName, setCatagoryName] = useState("");
  const [votes, setVotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [injectCatagory, setInjectCatagory] = useState(false);

  console.log("catagoryName", catagoryName);



  if (categories.length === 0) {
    fetch("api/games/category")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setCategories(data);}}
      )
      .catch(err => console.log(err));
  }

  
  console.log("catagoryIDs: ", categories)


  
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
          {props.loggedIn ? (<h1 className="text-white">Welcome to your Dashboard!</h1>)
          : (<h1 className="text-white">Welcome to the Game Dash!</h1>)}
          
          <div className="flex flex-col items-center">
            <div className="flex flex-row space-x-12">
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Favorite game"}
                //catagoryID = the element.id in the categoryIDs array that has the name "Favorite game" if it exists
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
