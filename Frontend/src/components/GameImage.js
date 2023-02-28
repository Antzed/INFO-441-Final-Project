import React from 'react'

function GameImage(props){
    return (
        <img src={props.image} alt={props.gameName} onClick={props.onClick}/>
    )
}

export default GameImage;