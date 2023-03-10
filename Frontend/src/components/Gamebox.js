import React, { useState, useEffect } from "react";

function Gamebox(props) {
  const [hasGame, setHasGame] = useState(false); // whether this catagory already got a game added
  const [imageLink, setImageLink] = useState(""); // the image link of the game

  const [publicGameInfo, setPublicGameInfo] = useState({}); // the public game info of the game

  let setShowSearch = props.setShowSearch;
  let setCatagoryName = props.setCatagoryName;
  let catagoryName = props.catagoryName;
  let category = props.category;
  let loggedIn = props.loggedIn;
  function handleAdd() {
    // add a game
    // pass in current Catagory, then show search window
    fetch("api/users/")
      .then(res => res.json())
      .then(data => {
        if (data.status === "loggedin") {
          setCatagoryName(catagoryName);
          setShowSearch(true);
        } else {
          alert("Please login first");
        }
      })
  }

  // if imageLink is not empty, then show the image
  useEffect(() => {
    if (category !== undefined) {
      fetch("api/users/vote")
        .then(res => res.json())
        .then(data => {

          let vote = data.find(vote => vote.categoryID === category._id);
          if (vote) {
            setHasGame(true);
            setImageLink(vote.gameImageUrl);
          } else {
            setHasGame(false);
          }
        })
    }
  }, [category])

  useEffect(() => {
    if (category !== undefined && !loggedIn) {
      fetch("api/votes/count?categoryID=" + encodeURIComponent(category._id))
        .then(res => res.json())
        .then(data => {
          setPublicGameInfo(data);
        })
    }
  }, [category])

  //todo display picture of game if selected if not add a plus sign
  return (
    <div className="flex flex-col w-80 h-52 rounded-lg overflow-hidden my-6 shadow-xl">
      { loggedIn ? ( 
        <> 
          <div className="flex w-full h-2/3 bg-dark-grey justify-center items-center">
            {!hasGame ? (
              <div onClick={handleAdd} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-20 h-20 stroke-white">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ) : (
              <div className="cursor-pointer w-full h-full">
                <img src={imageLink} alt="game" className="object-cover" />
              </div>
            )}
          </div>
          <div className="flex w-full h-1/3 bg-dark-text text-white items-center">
              <div className="w-2/3 font-bold text-xl m-3 flex justify-left items-center">
                {catagoryName}
              </div>
              <div className="w-1/3 h-2/3 mt-3 mr-2 pt-2 items-center text-center content-center Btn border-2 border-white rounded-3xl font-bold hover:bg-white hover:text-dark-text transition duration-100" onClick={() => handleAdd()}>
                Change
              </div>
          </div>
       </> ) : ( 
        <>
          <div className="flex w-full h-2/3 bg-dark-grey justify-center items-center z-0">
            <div className="cursor-pointer w-full h-full relative ">
                  <img src={publicGameInfo.gameImageUrl} alt="game" className="object-cover " />
                  <div class="opacity-0 hover:opacity-100 absolute inset-0 flex justify-center items-center z-20">{publicGameInfo.gameTitle}</div>
            </div>
          </div>
          <div className="flex w-full h-1/3 bg-dark-text text-white items-center z-10">
            <div className="w-2/3 font-bold text-xl m-3 flex justify-left items-center">
                {catagoryName}
            </div>
            <div className="w-1/3 h-2/3 mt-3 mr-2 pt-2 items-center text-center content-center font-bold">
              {publicGameInfo.count} votes
            </div>
          </div>
            
        </>
        ) }


    </div>
  );
}

export default Gamebox;
