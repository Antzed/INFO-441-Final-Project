import React, {useState} from "react";


function Gamebox({ setShowSearch, setCatagoryName, catagoryName }) {
  const [hasGame, setHasGame] = useState(false); // whether this catagory already got a game added

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
          <></>
        )}
      </div>
      <div className="w-full h-1/3 font-bold bg-dark-text text-white text-xl p-4">
        {catagoryName}
      </div>
    </div>
  );
}

export default Gamebox;
