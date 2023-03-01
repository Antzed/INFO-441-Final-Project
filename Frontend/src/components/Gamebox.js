import React, {useState, useEffect} from "react";



function Gamebox(props) {
  const [hasGame, setHasGame] = useState(false); // whether this catagory already got a game added
  const [imageLink, setImageLink] = useState(""); // the image link of the game

  let setShowSearch = props.setShowSearch;
  let setCatagoryName = props.setCatagoryName;
  let catagoryName = props.catagoryName;
  let categoryID = props.categoryID;
  // const [addStatus, setAddStatus] = useState(false);
  function handleAdd() {
    // add a game
    // pass in current Catagory, then show search window
    fetch("api/users/")
    .then(res => res.json())
    .then(data => {
      if (data.status === "loggedin") {
        setCatagoryName(catagoryName);
        setShowSearch(true);
        //set add status to what it is not
        // setAddStatus(!addStatus);
      } else {
        alert("Please login first");
      }
    })
  }

  // if imageLink is not empty, then show the image
  console.log("id" ,categoryID)
  if (categoryID !== undefined) {
    fetch("api/users/vote")
    .then(res => res.json())
    .then(data => {
      // find the vote with the same catagoryID
      console.log("total votes", data);
      
      let vote = data.find(vote => vote.categoryID === categoryID._id);
      console.log("vote", vote);
      if (vote) {
        setHasGame(true);
        setImageLink(vote.gameImageUrl);
        console.log("image", imageLink);
      } else {
        setHasGame(false);
      }
    })
  }


  // useEffect(() => {
    
  //   })

  //   // reload the page
  //   // window.location.reload();
    
  // }, [categoryID, imageLink])






  //todo display picture of game if selected if not add a plus sign
  return (
    <div className="flex flex-col w-80 h-52 rounded-lg overflow-hidden my-6 shadow-xl">
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
          <div className="cursor-pointer">
            <img src={imageLink} alt="game" className="w-20 h-20" />
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

