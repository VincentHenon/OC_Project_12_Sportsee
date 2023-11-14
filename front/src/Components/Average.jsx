import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer} from 'recharts'
import { useParams } from 'react-router-dom'
import { isDevMode } from '../App'
import { getAverageData } from '../API/getData'


/**
  * React component for displaying average data as a line chart.
  * @returns jsx
*/
function Average() {

  const [averageData, setAverageData] = useState()
  const { id } = useParams()
  
    /**
      * Fetches activity data from the API and updates the component's state.
      * @returns A promise that resolves when the data is fetched and state is updated.
    */
    useEffect(() => {
        async function fetchData() {
            try {
                const apiData = await getAverageData(id) 
                // check devMode to add or not .data to apiData
                setAverageData(isDevMode ? apiData : apiData.data)
            } catch (error) {
                console.error("data fetching failed somehow.")
            }
        }
        fetchData()
    }, [id])

  // Fallback where data is not found or takes time
  if (!averageData || averageData.length === 0) {
    return <p>Loading</p>
  }
  else {
    /**
     * Function to convert numeric day into the day's 1st letter.
     * @param {number} day - Numeric representation of the day (1 to 7).
     * @returns {string} The day's 1st letter.
    */
    function convertDay(day) {
      switch(day) {
        case 1:
          return 'L'
        case 2:
          return 'M'
        case 3:
          return 'M'
        case 4:
          return 'J'
        case 5:
          return 'V'
        case 6:
          return 'S'
        case 7:
          return 'D'
        default:
          return ''// where day is not a number or not within the cases
      }
    }

    const newAverageData = {
      userId: averageData.userId,
      sessions: averageData.sessions.map((session) => ({
        day: convertDay(session.day),
        sessionLength: session.sessionLength,
      })),
    }
    console.log("newAverageData: " , newAverageData)

    const AverageToolTip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="averageToolTip">
            <p className="labelMin">{`${payload[0].value} min`}</p>
          </div>
        )
      }
    
      return null
    }

    return (
      <div className="averageContainer">
        <p className="averageTitle">Durée moyenne des sessions</p>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={newAverageData.sessions}
          margin={{
            top: 15,
            right: 15,
            left: 15,
            bottom: 15,
          }}
        >
          
          <XAxis className="averageXAxis" dataKey="day" stroke="#FF0101" tick={{ fontSize: 13, fill: "white"}}/>
          <YAxis hide="true" domain={[-10, 100]}/>
          <Tooltip content={<AverageToolTip />} />
          <Line dot={false} type="monotone" dataKey="sessionLength" cornerRadius={5} strokeWidth={2} stroke="#FFFFFF" />
          
        </LineChart>
      </ResponsiveContainer>
      </div>
    )
  }
}

Average.propTypes = {
  averageData: PropTypes.object
}

export default Average