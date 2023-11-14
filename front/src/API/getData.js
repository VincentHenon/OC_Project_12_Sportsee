import axios from 'axios'
import { USER_ACTIVITY, USER_MAIN_DATA, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../Assets/Mockups/data'
import { isDevMode } from '../App'

/**
 * Function to fetch data from the API or provide local data based on dev/prod mode.
 * @param {string} url - The URL to fetch data from.
 * @param {object} localData - Local data to be used as a fallback.
 * @returns {Promise<object>} The fetched data or local data.
 */
const fetchData = async (url, localData) => {
  if (!isDevMode) {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (e) {
      console.error(e)
      // return localData real fallback
    }
  } else {
    // Return the local data based on the 'isDevMode' on App.js.
    return localData
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
  return fetchData(apiUrl, localMainData)
}

/**
 * Fetches activity data for a user.
 * @param {number} id - User ID.
 * @returns {Promise<object>} Activity data for the user.
 */
export const getActivityData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/activity`
  const localActivityData = USER_ACTIVITY.find(item => item.userId === parseInt(id))
  return fetchData(apiUrl, localActivityData)
};

/**
 * Fetches average data for a user's sessions.
 * @param {number} id - User ID.
 * @returns {Promise<object>} Average session data for the user.
 */
export const getAverageData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/average-sessions`
  const localAverageData = USER_AVERAGE_SESSIONS.find(item => item.userId === parseInt(id))
  return fetchData(apiUrl, localAverageData)
};

/**
 * Fetches performance data for a user.
 * @param {number} id - User ID.
 * @returns {Promise<object>} Performance data for the user.
 */
export const getPerformanceData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/performance`
  const localPerformanceData = USER_PERFORMANCE.find(item => item.userId === parseInt(id))
  return fetchData(apiUrl, localPerformanceData)
}
