import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ResultItem from "./ResultItem";


function GameSearch({ setShowSearch, catagoryName }) {
  //Search the game, Store the vote to backend, search need gameName(from here) + catagoryName(from gamebox) + catagoryID(find from DB)
  const[games, setGames] = useState([]);

  // search games
  function handleSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    alert("search " + e.target.searchText.value + " for " + catagoryName);
    setGames(["game1", "game2", "game3"])
  }

  // store the vote
  // TODO: get info from backend
  function handleStore(gameName) {
    alert("store Game: " + gameName + " for Catagory: " + catagoryName);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        categoryID: 'categoryID',
        categoryName: 'categoryName',
        user: "userid",
        game: "gamename" 
      })
    };
    fetch('http://localhost:3000/api/users/vote', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
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
          {games.map((game) => { return <ResultItem onClick={() => handleStore(game)} gameName={game} />})}
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
