import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ResponsiveContainer, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { getActivityData } from '../Services/getData'

/**
  * React component for displaying activity data as a bar chart.
  * @returns jsx
*/
function Activity() {
  const [loading, setLoading] = useState(true)
  const [activityData, setActivityData] = useState([])
  const { id } = useParams()

  /**
    * Fetches activity data from the API and updates the component's state.
    * @returns A promise that resolves when the data is fetched and state is updated.
  */
  useEffect(() => {
      async function fetchData() {
          try {
              const apiData = await getActivityData(id)
              setActivityData(apiData)
              setLoading(false)
          } catch (error) {
              console.error("data fetching failed somehow.")
              setLoading(false)
          }
      }
      fetchData()
  }, [id])

  // Fallback where data is not found 
  if ((!activityData || activityData.length === 0) && !loading) {
    return null
  }

  // when data takes time to load
  if (loading) {
    return <div>Chargement des données</div>
  }

  // when data is loaded
  if (!loading && activityData) { 
    // format date to number
    for (let i = 0 ; i < activityData.sessions.length ; i ++){
      activityData.sessions[i].day = i + 1
    }

    // tooltip for rechart
    const ActivityToolTip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="activityToolTip">
            <p className="labelKg">{`${payload[0].value}kg`}</p>
            <p className="labelKcal">{`${payload[1].value}kCal`}</p>
          </div>
        )
      }
    
      return null
    }

    // style for rechart's legend
    const legendStyling = {
      marginRight: 100,
    }

    return (
      <div className='barChartContainer'>
        <p className='activityTitle'>Activité quotidienne</p> 
        <ResponsiveContainer width="100%" height="100%">
          <BarChart className='barChartComponent'
              data={activityData.sessions}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
              barGap={1} 
              barCategoryGap={40}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="day" tickLine={false} dy={10} scale="point" padding={{left: 20, right: 20}}/>
              <YAxis yAxisId="calories" dataKey="calories" orientation="left" tickCount={3} hide={true} />
              <YAxis yAxisId="kilogram" dataKey="kilogram" orientation="right" axisLine={false} tickLine={false} tickCount={1} type="number" tick="false" domain={['dataMin - 1', 'dataMax + 1']}/>
              <Tooltip cursor={false} content={<ActivityToolTip />} />
              <Legend verticalAlign="top" height={80} align="right" iconType="circle" iconSize={8} style={legendStyling}/>
              <Bar yAxisId="kilogram" dataKey="kilogram" radius={[20, 20, 0, 0]} maxBarSize={10} fill="#282D30" activeBar={<Rectangle fill="#282D30" stroke="#282D30" />} name="Poids (kg)" />
              <Bar yAxisId="calories" dataKey="calories" radius={[20, 20, 0, 0]} maxBarSize={10} fill="#E60000" activeBar={<Rectangle fill="#E60000" stroke="#E60000" name="Calories brûlées (kCal)" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

Activity.propTypes = {
  id: PropTypes.string
}

export default Activity