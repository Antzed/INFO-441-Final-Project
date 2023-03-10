import React from 'react'
import GameImage from './GameImage'

function ResultItem(props) {
  return (
    <div className="resultItem flex items-left gap-4 py-4 cursor-pointer" onClick={props.onClick}>
      <h3>{props.gameName}</h3>
    </div>
  );
}


export default ResultItem