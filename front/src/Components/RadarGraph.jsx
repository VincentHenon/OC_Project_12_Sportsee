import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Radar, Legend, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { getPerformanceData } from '../Services/getData'

function RadarGraph() {
  const [performanceData, setPerformanceData] = useState({ data: [] })
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  let dataArray
  let perfDataFr

  // get performance data
  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await getPerformanceData(id)
        setPerformanceData(apiData)
        setLoading(false)
      } catch (error) {
        console.error("fetching data failed somehow.")
        setLoading(false)
      }
    }
    fetchData()
  }, [id])
  
  // convert data
  function convertData() {
    // iterate over the performanceData to replace "kind's numbers" with "kind's strings"
    dataArray = performanceData.data.map(item => ({
      kind: performanceData.kind[item.kind],
      value: item.value
    }))
    dataArray.reverse() //reverse the array

    // Translate in french the array
    perfDataFr = dataArray.map(item => {
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
  }

  // when data takes time to load
  if (loading) {
    return <div>Chargement des données</div>
  } 

  // when data is loaded
  if (!loading && performanceData) {
    convertData()
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
            <PolarGrid gridType='polygon' radialLines={false} /> 
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