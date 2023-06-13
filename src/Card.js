import React from 'react'

function Card({image, title, info}) {
    return (
        <div className="card2">
            {console.log(image)}
            {/* <div className="img" style={{backgroundImage: `url(${image})`}}></div> */}
            <img src={image} alt="Description of Image" className="img"/>
            <span>{title}</span>
            <p className="info">{info}</p>
            <div className="share">
            </div>
        </div>
    )
}

export default Card