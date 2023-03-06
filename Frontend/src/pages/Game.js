import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import Platformbox from '../components/Platformbox';

function Game() {
    const [publicGameInfo, setPublicGameInfo] = useState({}); // the public game info of the game
    const [votes, setVotes] = useState({}) //vote information for all related categories
    let { gameName } = useParams();

    //fetching game details
    //TODO: add error handling, should display a prompt that search is invalid
    useEffect(() => {
        fetch(`http://localhost:9000/api/games/data?search=${gameName}`) //doesn't work with spaces, and needs absolute path
        .then(res => res.json())
        .then(data => {
            console.log("game page", data);
            setPublicGameInfo(data);
        })
        .catch(err => console.log(err))

        //getting votes for all the categories
        fetch(`http://localhost:9000/api/games/allvotes?search=${gameName}`)
        .then(res => res.json())
        .then(data => {
            console.log("count data", data);
            setVotes(data);
        })
        .catch(err => console.log(err))
    }, [])
    
    //TODO: 1. need to map platforms to platformbox and display them. 2. need to display votes for each category (votes is an object)
    return(
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
          <div className="z-[2] mt-26 justify-center overflow-auto">
            <div className="flex flex-col justify-center max-w-3/4">
            <h1 className="text-white justify-center flex-grow m-4">{gameName}</h1>
            
            <div className="flex flex-col items-center">
              <img src="https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg" alt="game" className="object-cover w-1/2 h-1/4" />
              {/* <img src={publicGameInfo.background_image} alt="game" className="object-cover w-2/3 h-1/3" /> */}
              <div className="flex flex-row w-full justify-center ">
                  {/* {publicGameInfo.platforms.map((platform) => {
                      <Platformbox platform={platform.name} />
                  })} */}
                  <Platformbox platform="XBOX" />
                  <Platformbox platform="XBOX" />
              </div>
                  
                  <h2 className="text-white justify-start flex-grow">Release Date</h2>
                  <p>November 18, 2011</p>
                  <p>{publicGameInfo.released}</p>
                  <h2 className="text-white justify-start flex-grow max-w-3/4">Description</h2>
                  <p>Minecraft is a sandbox game developed by Mojang Studios. The game was created by Markus "Notch" Persson in the Java programming language.</p>
                  <p>{publicGameInfo.description}</p>
                  <h2 className="text-white justify-start flex-grow">Votes</h2>
                  {/* {votes.entries().map(keyValue => {
                      <p>{keyValue[0]}: {keyValue[1]}</p>})
                  } */}
                  <p>test: 1 vote</p>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default Game;