import React from 'react'
import PropTypes from 'prop-types'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

/**
 * React component for displaying goals data props as a radial bar chart.
 * @param {Object} props - Component props containing today's score and other data.
 * @returns jsx
*/
function Goals(props) {

const score = props.todayScore * 100 // format todayScore into %
const circleScore = props.todayScore * 360 // 12% of 360 degrees
const scoreData = [{ todayScore: circleScore }]
console.log("scoreData: ", scoreData)

  return (
    <div className='goalContainer'>
      <p className='scoreText'>Score</p>
      <div className='goalText'><p><span>{score}% </span>de votre objectif</p></div>
      <ResponsiveContainer width="100%" height="100%"> 
          <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="75%" barSize={10} data={scoreData} startAngle={-270} endAngle={-270 + circleScore}>
            <RadialBar className='radialBarStyle' cornerRadius={5} clockWise dataKey="todayScore"/>
          </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

Goals.propTypes = {
  todayScore: PropTypes.number
}

export default Goals
