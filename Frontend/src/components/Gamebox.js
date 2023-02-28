import React, {useState, useEffect} from "react";



function Gamebox({ setShowSearch, setCatagoryName, catagoryName }) {
  const [hasGame, setHasGame] = useState(false); // whether this catagory already got a game added
  const [imageLink, setImageLink] = useState(""); // the image link of the game

  // check if exportImage is empty using useEffect
  useEffect(() => {
    fetch("http://localhost:9000/api/games/get-chosen")
    .then(res => res.text())
    .then(data => {
      setImageLink(data)})
    .catch(err => console.log(err));
  }, [imageLink])
  // set hasGame to true if imageLink is not empty
  useEffect(() => {
    if (imageLink !== "") {
      setHasGame(true);
      
    }
  }, [imageLink])



  function handleAdd() {
    // add a game
    // pass in current Catagory, then show search window
    setCatagoryName(catagoryName);
    setShowSearch(true);
  }

  //todo display picture of game if selected if not add a plus sign
  return (
    <div className="flex flex-col w-80 h-52 rounded-lg overflow-hidden my-6 shadow-xl">
      <div className="flex w-full h-2/3 bg-dark-grey justify-center items-center">
        
        {!hasGame ? (
          <div onClick={handleAdd} className="cursor-pointer">
            <img className="w-full, h-2/3" src={imageLink}></img>
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
            <img src={imageLink}></img>
          </div>
        ) : (
          <div>
            <img className="w-full, h-2/3" src={imageLink}></img>
          </div>
        )}
      </div>
      <div className="w-full h-1/3 font-bold bg-dark-text text-white text-xl p-4">
        {catagoryName}
      </div>
    </div>
  );
}

export default Gamebox;

// import React, { useState } from "react";

// function Gamebox({ setShowSearch, setCatagoryName, catagoryName }) {
//   const [hasGame, setHasGame] = useState(false); // whether this catagory already got a game added
//   const [gameImage, setGameImage] = useState(""); // the image URL for the game, if hasGame is true

//   function handleAdd() {
//     // add a game
//     // pass in current Catagory, then show search window
//     setCatagoryName(catagoryName);
//     setShowSearch(true);
//   }

//   function handleImageLoadError() {
//     // if the game image fails to load, reset hasGame and gameImage
//     setHasGame(false);
//     setGameImage("");
//   }

//   return (
//     <div className="flex flex-col w-80 h-52 rounded-lg overflow-hidden my-6 shadow-xl">
//       <div className="flex w-full h-2/3 bg-dark-grey justify-center items-center">
//         {hasGame ? (
//           <img
//             className="w-full h-2/3 object-cover"
//             src={gameImage}
//             alt={catagoryName}
//             onError={handleImageLoadError}
//           />
//         ) : (
//           <div onClick={handleAdd} className="cursor-pointer">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-20 h-20 stroke-white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//         )}
//       </div>
//       <div className="w-full h-1/3 font-bold bg-dark-text text-white text-xl p-4">
//         {catagoryName}
//       </div>
//     </div>
//   );
// }

// export default Gamebox;

