import React from 'react'
import PropTypes from 'prop-types'
import Nutrient from './Nutrient'
import calorieImg from '../Assets/Media/calories-icon.svg'
import proteinImg from '../Assets/Media/protein-icon.svg'
import carbImg from '../Assets/Media/carbs-icon.svg'
import fatImg from '../Assets/Media/fat-icon.svg'

/**
 * React component for displaying nutrient information.
 * @param {Object} props - Component props containing nutrient data with drilling props technique.
 * @returns jsx.
*/
function Nutrients(props) {
  return (
    <div className='nutrientsContainer'>
      <Nutrient key="calories" name="calories" unit={props.data.calorieCount} img={calorieImg} />
      <Nutrient key="proteines" name="proteines" unit={props.data.proteinCount} img={proteinImg} />
      <Nutrient key="glucides" name="glucides" unit={props.data.carbohydrateCount} img={carbImg} />
      <Nutrient key="lipides" name="lipides" unit={props.data.lipidCount} img={fatImg} />
    </div>
  )
}

Nutrients.propTypes = {
  data: PropTypes.shape({
    calorieCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    proteinCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    carbohydrateCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lipidCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })
}

export default Nutrients
