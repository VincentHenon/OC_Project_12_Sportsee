import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Activity from '../Components/Activity'
import RadarGraph from '../Components/RadarGraph'
import Average from '../Components/Average'
import Nutrients from '../Components/Nutrients'
import Goals from '../Components/Goals'
import ServerError from '../Components/ServerError'
import { getMainData } from '../Services/getData'

/**
  * React component for displaying the dashboard page.
  * @returns jsx
*/
function Dashboard() {
  const [mainData, setMainData] = useState()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  
    /**
      * Fetches activity data from the API and updates the component's state.
      * @returns A promise that resolves when the data is fetched and state is updated.
    */
    useEffect(() => {
      async function fetchData() {
          try {
              const apiData = await getMainData(id)
              setMainData(apiData)
              setLoading(false)
          } catch (error) {
              console.error("Fetching data failed somehow.", error)
              setLoading(false)
          }
      }
      fetchData()
  }, [id])

  // Fallback where data is not found
  if ((!mainData || mainData.length === 0) && !loading) {
    return <ServerError />
  }

  // when data takes time to load
  if (loading) {
    return <div>Chargement des données</div>
  }

  // when data is loaded
  if (!loading && mainData) {
    return (
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h2>Bonjour <span>{mainData.firstName}</span></h2>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="chartsContainer">
          <div className="chart-col_1">
            <Activity className="activityChart" />
            <div className="chart-col-1-row-2">
              <Average />
              <RadarGraph />
              <Goals todayScore= {mainData.todayScore } />
            </div>
          </div>
          <Nutrients className="nutrientsChart" data= {mainData.keyData}/>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  mainData: PropTypes.shape({
    userInfos: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number
    }),
    todayScore: PropTypes.number,
    keyData: PropTypes.shape({
      calorieCount: PropTypes.number,
      proteinCount: PropTypes.number,
      carbohydrateCount: PropTypes.number,
      lipidCount: PropTypes.number
    })
  })
}

export default Dashboard