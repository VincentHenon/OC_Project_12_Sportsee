import React from 'react'
import weightPath from "../Assets/Media/logoWeight.svg"
import swimmingPath from "../Assets/Media/logoSwimming.svg"
import bikePath from "../Assets/Media/logoBike.svg"
import meditatePath from "../Assets/Media/logoMeditate.svg"

/**
  * React component for displaying the left vertical sidebar.
  * @returns jsx
*/
function Sider() {
    return (
       <aside>
        <div className="siderContainer">
            <nav className="siderNav">
                <img src= {meditatePath} alt="logo for medidate" />
                <img src= {bikePath} alt="logo for bike" />
                <img src= {swimmingPath} alt="logo for swimming" />
                <img src= {weightPath} alt="logo for weight" />
            </nav>
            <div className="siderCredits">Copyright, SportSee 2023</div>
        </div>
       </aside>
    )
}

export default Sider