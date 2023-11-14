import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Activity from '../Components/Activity'
import RadarGraph from '../Components/RadarGraph'
import Average from '../Components/Average'
import Nutrients from '../Components/Nutrients'
import Goals from '../Components/Goals'
import ServerError from '../Components/ServerError'
import { getMainData } from '../API/getData'
import {isDevMode} from '../App'

/**
  * React component for displaying the dashboard page.
  * @returns jsx
*/
function Dashboard(props) {

  const [mainData, setMainData] = useState()
  const { id } = useParams()
  
    /**
      * Fetches activity data from the API and updates the component's state.
      * @returns A promise that resolves when the data is fetched and state is updated.
    */
    useEffect(() => {
        async function fetchData() {
            try {
                const apiData = await getMainData(id) 
                // check devMode to add or not .data to apiData
                setMainData(isDevMode ? apiData : apiData.data)
            } catch (error) {
                console.error("fetching data failed somehow.")
            }
        }
        fetchData()
    }, [id])

  // Fallback where data is not found or takes time
  if (!mainData || mainData.length === 0) {
    return <ServerError />
  }
  else {
    console.log("mainData:" , mainData)
    return (
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h2>Bonjour <span>{mainData.userInfos.firstName}</span></h2>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
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