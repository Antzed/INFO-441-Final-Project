import React from 'react'

function ResultItem(props) {
  return (
    <div className="resultItem flex items-left gap-4 py-4">
      <h3>{props.name}</h3>
    </div>
  );
}

export default ResultItem