import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import Platformbox from '../components/Platformbox';

function Game() {
    const [publicGameInfo, setPublicGameInfo] = useState({}); // the public game info of the game
    const [votes, setVotes] = useState({}) //vote information for all related categories
    let { gameName } = useParams();
    const [pcCheker, setPcCheker] = useState(false);
    const [psChecker, setPsChecker] = useState(false);
    const [xboxChecker, setXboxChecker] = useState(false);

    //fetching game details
    //TODO: add error handling, should display a prompt that search is invalid
    useEffect(() => {
        fetch(`api/games/data?search=${gameName}`) //doesn't work with spaces, and needs absolute path
        .then(res => res.json())
        .then(data => {
            console.log("game page", data);
            JSON.stringify(data);
            setPublicGameInfo(data);
        })
        .catch(err => console.log(err))

        // getting votes for all the categories
        fetch(`api/games/allvotes?search=${gameName}`)
        .then(res => res.json())
        .then(data => {
            
            JSON.stringify(data);
            console.log("count data", data);
            console.log("count data", typeof data);
            console.log(Object.keys(data))
            console.log(Object.values(data))
            setVotes(data);
        })
        .catch(err => console.log(err))
        
    }, [])

    useEffect(() => {
      //create a function that search through the publicGameInfo and return the platform names
      if (Object.keys(publicGameInfo).length !== 0) {
        console.log(publicGameInfo)
        for (let i = 0; i < publicGameInfo.platforms.length; i++) {
          //  check if the platform's name include "Pc", "Playstation" or Xbox", if so, set the checker to 1
          if (publicGameInfo.platforms[i].platform.name.includes("PC")) {
              setPcCheker(true);
          }
          if (publicGameInfo.platforms[i].platform.name.includes("PlayStation")) {
              setPsChecker(true);
          }
          if (publicGameInfo.platforms[i].platform.name.includes("Xbox")) {
              setXboxChecker(true);
          }
        }
      }
      console.log("pc", pcCheker)
      console.log("ps", psChecker)
      console.log("xbox", xboxChecker)
    }, [publicGameInfo])

    function Vote(props){
      return (
        <p>{props.category}:{props.count}</p>
      )
    }

    function PrintVote(props){
      let div = <div></div>
      for (const category in props.votes){
        // add <p>{category}:{props.votes[category]}</p> to the div and add a new line
        div = <>{div}<p>{category}: {props.votes[category]} count</p></>
      }
      
      return (<>{div}</>)
    }
    
    return (
      <>
        <div
          className="min-h-[100vh] w-screen relative p-[80px] overflow-hidden"
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
              <h1 className="text-white justify-center text-center flex-grow m-8 text-5xl">
                {publicGameInfo.name}
              </h1>

              <div className="flex flex-col items-center">
                <img
                  src={publicGameInfo.background_image}
                  alt="game"
                  className="object-cover max-h-[320px] rounded-xl drop-shadow-xl"
                />
                <div className="flex flex-row w-full justify-center ">
                  { xboxChecker ? ( <><Platformbox platform="X-BOX" /></>) : <></> }
                  { pcCheker ? (<><Platformbox platform="PC" /></> ) : <></> }
                  { psChecker? (<><Platformbox platform="PLAYSTATION" /></> ) : <></> }
                </div>

                <div className="mt-8 flex justify-evenly gap-4 max-w-[800px]">
                  <div className="flex-1">
                    <h2 className="text-white justify-start flex-grow">
                      Release Date
                    </h2>
                    <p className="mb-8">{publicGameInfo.released}</p>
                    <h2 className="text-white justify-start flex-grow">
                      Votes
                    </h2>
                    <PrintVote votes={votes}/>
                    {/* <p>{Object.keys(votes)}: {Object.values(votes)}</p> */}
                    <h2 className="text-white justify-start flex-grow mt-8">
                      Rating
                    </h2>
                    <p>{publicGameInfo.rating ? publicGameInfo.rating: "No rating available"}</p>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white justify-start flex-grow max-w-3/4">
                      Description
                    </h2>
                    <p>
                      {publicGameInfo.description ? publicGameInfo.description : "No description available"}
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Game;