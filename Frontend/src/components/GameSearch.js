import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ResultItem from "./ResultItem";
import GameImage from "./GameImage";

const escapeHTML = str => !str ? str : str.replace(/[&<>'"]/g, 
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));


function GameSearch({ setShowSearch, setCatagoryName, catagoryName }) {
  //Search the game, Store the vote to backend, search need gameName(from here) + catagoryName(from gamebox) + catagoryID(find from DB)
  const [selectedGame, setSelectedGame] = useState("");
  const [games, setGames] = useState([]);
  const [gameImages, setGameImages] = useState([]);
  const [selectGameImage, setSelectGameImage] = useState("");

  // search games

  function handleSearch(e) {
    console.log("searching catagory name", catagoryName);
    e.preventDefault();
    e.stopPropagation();
    setGameImages([]);
    setSelectedGame("");
    //fetch and get the list of games
    fetch(
      "api/games/?search=" + encodeURIComponent(e.target.searchText.value)
    )
      // turn res into array
      .then((res) => res.json())
      // set the array to games
      .then((data) => {
        console.log(typeof data);
        setGames(data);
      })
      .catch((err) => console.log(err));
  }

  function handleGameClick(e) {
    console.log("game clicked catagory name", catagoryName);
    //get the clicked game name
    let gameName = e.target.innerText;
    // get rid of em dash
    gameName = gameName.replace("—", "");
    setSelectedGame(gameName);
    fetch(`api/games/imgs?search=${encodeURIComponent(gameName)}`)
      .then((res) => res.json())
      .then((data) => setGameImages(data))
      .catch((err) => console.log(err));
  }

  function handleImageClick(e) {
    console.log("image clicked catagory name", catagoryName);
    //get the clicked game name
    let gameImage = e.target.src;
    setSelectGameImage(gameImage);
    console.log(gameImage);
    //post the game image to backend
    handleStore(gameImage);
    
  }

  // store the vote
  // TODO: get info from backend
  function handleStore(gameImage) {
    // alert("store Game: " + gameName + " for Catagory: " + catagoryName);
    console.log("catagory name in store game", catagoryName);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryName: escapeHTML(catagoryName),
        gameTitle: escapeHTML(selectedGame),
        gameImageUrl: escapeHTML(gameImage),
      }),
    };
    fetch("api/users/vote", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    setShowSearch(false);
    // reload page
    window.location.reload();
  }

  return (
    <div className="w-full h-full absolute top-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col justify-center items-center w-[50%] max-w-2xl rounded-lg overflow-hidden p-10 gap-12 bg-dark-text bg-opacity-100 shadow-xl">
        <h1>Select Your Game</h1>
        <form
          id="search-form"
          onSubmit={handleSearch}
          className="flex flex-row items-center justify-between rounded-3xl p-4 w-full border-2 border-white ">
          <input
            className="py-3 px-3 bg-transparent flex-1 outline-none"
            name="searchText"
            placeholder="Search Game"
          />
          <button
            form="search-form"
            type="submit"
            className="text-white scale-125">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div
          className={`resultList w-full max-h-[400px] gap-4 overflow-y-scroll`}>
          {/* print the games names out oneline at  time */}

          {gameImages.length == 0 &&
            games.map((game, index) => (
              <ResultItem
                key={index}
                gameName={game}
                gameImages={gameImages}
                onClick={handleGameClick}
              />
            ))}

          {gameImages.length != 0 &&
            gameImages.map((image, index) => (
              <GameImage
                image={image}
                alt={selectedGame}
                onClick={handleImageClick}
              />
            ))}
        </div>
        <div
          className="cancelBtn border-2 border-white px-8 py-4 rounded-3xl font-bold hover:bg-white hover:text-dark-text transition duration-100"
          onClick={() => setShowSearch(false)}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default GameSearch;
