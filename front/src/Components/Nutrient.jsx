import React from 'react'
import PropTypes from 'prop-types'

/**
 * React component for displaying nutrient information.
 * @param {Object} props - Component props containing nutrient data with drilling props technique.
 * @returns jsx.
*/
function Nutrient(props) {
  return (
    <div className='nutrientContainer'>
        <img src={props.img} alt= "icon"></img>
        <div className='nutrientContentContainer'>
            {/* change the unit */}
            <h2>{props.name === "calories" ? `${props.unit}Kcal` : `${props.unit}g`}</h2> 
            <p>{props.name}</p>
        </div>
    </div>
  )
}

Nutrient.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Nutrient