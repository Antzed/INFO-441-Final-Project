import React, { useState, useEffect } from "react";

import Gamebox from "../components/Gamebox";
import GameSearch from "../components/GameSearch";
//
function Dashboard() {
  const [showSearch, setShowSearch] = useState(false);
  console.log(showSearch);
  const [catagoryName, setCatagoryName] = useState("");
  const [votes, setVotes] = useState([]);
  
  // everytime a vote is stored, get the votes
  useEffect(() => {
    console.log("get votes")
    fetch("http://localhost:3000/api/users/vote")
    .then(res => {
      let response = res.json()
      setVotes(response)
      console.log("votes: ", votes)
    })
  }, [])
  
  
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
          <h1 className="text-white">Welcome to your Dashboard!</h1>
          <div className="flex flex-col items-center">
            <div className="flex flex-row space-x-12">
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"1GameOfTheYear"}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"2GameOfTheYear"}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"3GameOfTheYear"}
              />
            </div>
            <div className="flex flex-row space-x-12">
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"4GameOfTheYear"}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"5GameOfTheYear"}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"6GameOfTheYear"}
              />
            </div>
          </div>
        </div>
      </div>
      {showSearch ? (
        <GameSearch setShowSearch={setShowSearch} catagoryName={catagoryName} />
      ) : (
        <></>
      )}
    </>
  );
}
export default Dashboard;
