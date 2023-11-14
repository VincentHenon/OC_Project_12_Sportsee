import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Radar, Legend, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { getPerformanceData } from '../API/getData'
import { isDevMode } from '../App'

function RadarGraph() {
  const [performanceData, setPerformanceData] = useState({ data: [] })
  const { id } = useParams()

  // get performance data
  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await getPerformanceData(id)
        setPerformanceData(isDevMode ? apiData : apiData.data)
      } catch (error) {
        console.error("fetching data failed somehow.")
      }
    }
    fetchData()
  }, [id])
  
  // Isolate kind keys
  const perfData = performanceData.data.map(item => ({
    kind: performanceData.kind[item.kind],
    value: item.value
  }))
  perfData.reverse()

  // Convert perfData to French
  const perfDataFr = perfData.map(item => {
    let kind
    switch (item.kind) {
      case 'energy':
        kind = 'energie'
        break
      case 'strength':
        kind = 'force'
        break
      case 'speed':
        kind = 'vitesse'
        break
      case 'intensity':
        kind = 'intensité'
        break
      default:
        kind = item.kind
    }
    return { kind: kind, value: item.value }
  })

  // rendering
  if (!performanceData.data || performanceData.data.length === 0) {
    return <p>Loading</p>
  } else {
    return (
      <div className="radarContainer">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={perfDataFr} 
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10
            }}>
            <PolarGrid gridType='polygon' radialLines={false} polarRadius={[0, 10, 30, 50, 70, 88]}/> 
            <PolarAngleAxis dataKey="kind" tick={{ fontSize: 12, fill: "#FFFFFF" }} />

            {perfDataFr.map((item, index) => (
              <Radar
                key={index}
                name={item.kind}
                dataKey="value"
                fill="rgba(255, 1, 1, .3)"
                fillOpacity={.6}
                legendType='none'
                label={false}
              />
            ))}

            <Legend legendType="none" />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

RadarGraph.propTypes = {
  performanceData: PropTypes.object
}

export default RadarGraph
