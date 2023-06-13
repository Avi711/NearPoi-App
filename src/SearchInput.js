import React, { useState } from 'react'
import Toggle from './Toggle';

function SearchInput({ changeCenter }) {

    const [inputlat, setInputlat] = useState();
    const [inputlng, setInputlng] = useState();
    const [inputrad, setInputrad] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = React.useState("Pois");





    return (
        <div className="container">
            <div className="card">
                <a className="login">Search Pois</a>
                <div className="inputBox">
                    <input type="text" required="required" value={inputlat} onChange={(e) => setInputlat(e.target.value)}></input>
                    <span className="user">Latitude</span>
                </div>

                <div className="inputBox">
                    <input type="text" required="required" value={inputlng} onChange={(e) => setInputlng(e.target.value)}></input>
                    <span>Longitude</span>
                </div>
                <div className="inputBox">
                    <input type="text" required="required" value={inputrad} onChange={(e) => setInputrad(e.target.value)}></input>
                    <span>Radius</span>
                </div>
                <Toggle mode={mode} setMode={setMode}></Toggle>
                { !isLoading ? <button className="enter" onClick={() => changeCenter({ lat: parseFloat(inputlat), lng: parseFloat(inputlng) }, inputlat, inputlng, inputrad, setIsLoading, mode)}>Enter</button> : <div className="spinner"></div>}


            </div>
        </div>
    )
}

export default SearchInput