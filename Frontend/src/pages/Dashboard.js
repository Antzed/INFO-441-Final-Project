import React, { useState, useEffect } from "react";

import Gamebox from "../components/Gamebox";
import GameSearch from "../components/GameSearch";
//
function Dashboard(props) {
  const [showSearch, setShowSearch] = useState(false);
  console.log(showSearch);
  const [catagoryName, setCatagoryName] = useState("");
  const [votes, setVotes] = useState([]);
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [injectCatagory, setInjectCatagory] = useState(false);

  console.log("catagoryName", catagoryName);


  useEffect(() => {
    fetch("api/games/category")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setCategoryIDs(data);}}
      )
      .catch(err => console.log(err));
  }, [!categoryIDs])
  
  console.log("catagoryIDs: ", categoryIDs)

  
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
                catagoryName={"Favorite game"}
                categoryID={categoryIDs[3]}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Most played game"}
                categoryID={categoryIDs[4]}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Definitely recommend"}
                categoryID={categoryIDs[5]}
                loggedIn={props.loggedIn}
              />
            </div>
            <div className="flex flex-row space-x-12">
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Always wanted to play"}
                categoryID={categoryIDs[0]}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Rare gem"}
                categoryID={categoryIDs[1]}
                loggedIn={props.loggedIn}
              />
              <Gamebox
                setShowSearch={setShowSearch}
                setCatagoryName={setCatagoryName}
                catagoryName={"Game of the year"}
                categoryID={categoryIDs[2]}
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
