import axios from 'axios'
import { USER_ACTIVITY, USER_MAIN_DATA, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../Assets/Mockups/data'
import { isDevMode } from '../App'
import UserMain from '../Model/UserMain'
import UserActivity from '../Model/UserActivity'
import UserAverage from '../Model/UserAverage'
import UserPerformance from '../Model/UserPerformance'

/**
 * Function to fetch data from the API or provide local data based on dev/prod mode.
 * @param {string} url - The URL to fetch data from.
 * @param {object} localData - Local data to be used as a fallback.
 * @returns {Promise<object>} The fetched data or local data.
 */
const fetchData = async (url, localData) => {
  if (isDevMode) {
    // Return the local data if 'isDevMode' is true on App.js otherwise use the API.
    return localData
  } else {
    try {
      const response = await axios.get(url)
      const res = response.data
      return res.data
    } catch (e) {
      console.error(e)
    }    
  }
}

/**
 * Fetches main data for a user.
 * @param {number} id - User ID.
 * @returns {Promise<object>} Main data for the user.
 */
export const getMainData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}`
  const localMainData = USER_MAIN_DATA.find(item => item.id === parseInt(id))
  const data = await fetchData(apiUrl, localMainData)
  return new UserMain(data)

}

/**
 * Fetches activity data for a user.
 * @param {number} id - User ID.
 * @returns {Promise<object>} Activity data for the user.
 */
export const getActivityData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/activity`
  const localActivityData = USER_ACTIVITY.find(item => item.userId === parseInt(id))
  const data = await fetchData(apiUrl, localActivityData)
  return new UserActivity(data)
}

/**
 * Fetches average data for a user's sessions.
 * @param {number} id - User ID.
 * @returns {Promise<object>} Average session data for the user.
 */
export const getAverageData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/average-sessions`
  const localAverageData = USER_AVERAGE_SESSIONS.find(item => item.userId === parseInt(id))
  const data = await fetchData(apiUrl, localAverageData)
  return new UserAverage(data)
}

/**
 * Fetches performance data for a user.
 * @param {number} id - User ID.
 * @returns {Promise<object>} Performance data for the user.
 */
export const getPerformanceData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/performance`
  const localPerformanceData = USER_PERFORMANCE.find(item => item.userId === parseInt(id))
  const data = await fetchData(apiUrl, localPerformanceData)
  return new UserPerformance(data)
}
