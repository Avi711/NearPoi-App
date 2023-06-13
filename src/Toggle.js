import React from 'react'

function Toggle({mode, setMode}) {



    const handleToggle = (e) => {
        const targetLabel = e.target.nextSibling;
        const newMode = mode === "Pois" ? targetLabel.getAttribute("data-on") : targetLabel.getAttribute("data-off");
        setMode(newMode);
        console.log(newMode)
    };



    return (
        <div className="btn-container">
            <label className="switch btn-color-mode-switch">
                <input value="1" id="color_mode" name="color_mode" type="checkbox" onChange={(e) => handleToggle(e)}></input>
                <label className="btn-color-mode-switch-inner" data-off="Pois" data-on="Events" htmlFor="color_mode"></label>
            </label>

        </div>
    )
}

export default Toggle