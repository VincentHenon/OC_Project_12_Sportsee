import React from 'react'
import { NavLink } from 'react-router-dom'

/**
  * React component for displaying the home page and select the mocked user
  * @returns jsx
*/
export default function Home() {
  return (
    <>
      <div className='homeWrapper'>
        <h2>Choisisez l'utilisateur type:</h2>
          <div className='userBtnWrapper'>
              <NavLink to="/user/12" className="userBtn" >Karl</NavLink>
              <NavLink to="/user/18" className="userBtn" >Cecilia</NavLink>
          </div>
      </div>
    </>
  )
}
