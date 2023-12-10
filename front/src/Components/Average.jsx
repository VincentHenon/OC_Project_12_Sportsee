import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer} from 'recharts'
import { useParams } from 'react-router-dom'
import { getAverageData } from '../Services/getData'

/**
  * React component for displaying average data as a line chart.
  * @returns jsx
*/
function Average() {
  const [averageData, setAverageData] = useState()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  
    /**
      * Fetches activity data from the API and updates the component's state.
      * @returns A promise that resolves when the data is fetched and state is updated.
    */
    useEffect(() => {
        async function fetchData() {
            try {
                const apiData = await getAverageData(id) 
                setAverageData(apiData)
                setLoading(false)    
            } catch (error) {
                console.error("data fetching failed somehow.")
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

  // Fallback where data is not found 
  if ((!averageData || averageData.length === 0) && !loading) {
    return null
  }

  // when data takes time to load
  if (loading) {
    return <div>Chargement des données</div>
  }

  // when data is loaded
  if (!loading && averageData) {  
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
      <div className="averageContainer" >
        <p className="averageTitle">Durée moyenne des sessions</p>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={averageData.sessions}
          margin={{
            top: 15,
            right: 15,
            left: 15,
            bottom: 15,
          }}
          onMouseMove={(e) => {
            if (e.isTooltipActive === true) {
              const chartContainer = document.querySelector(".averageContainer")
              const chartContainerWidth = chartContainer.clientWidth
              const positionX = Math.round((e.activeCoordinate.x / chartContainerWidth) * 100)
              chartContainer.style.backgroundImage = `linear-gradient(to right, #ff0000 ${positionX}%, #d60000 ${positionX}%)`
            }
          }}
          onMouseLeave={() => {
            const chartContainer = document.querySelector(".averageContainer")
            chartContainer.style.backgroundImage = 'none'
          }}  
        >
          <XAxis className="averageXAxis" dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "white"}}/>
          <YAxis hide="true" domain={[-10, 100]}/>
          <Tooltip 
            content={<AverageToolTip /> } 
            cursor={false}
          />
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