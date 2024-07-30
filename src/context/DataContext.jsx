import axios from "axios"
import { createContext, useState } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  // theme
  const [theme, setTheme] = useState('light')
  // API
  const [user, setUser] = useState({})
  const [course, setCourse] = useState({})
  const [activity, setActivity] = useState({})
  const [attempt, setAttempt] = useState({})
  const [newAttempt, setNewAttempt] = useState(false)
  const userAPI = axios.create({ baseURL: import.meta.env.VITE_USER_API })
  const answerApi = axios.create({ baseURL: import.meta.env.VITE_ANSWER_API })
  const activityApi = axios.create({ baseURL: import.meta.env.VITE_ACTIVITY_API })
  const attemptApi = axios.create({ baseURL: import.meta.env.VITE_ATTEMPT_API })
  const serverError = 'El servidor no respondió. Intente nuevamente.'
  const loginReq = async (data) => {
    try {
      const response = await userAPI.post('login', data)
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }
  const registerReq = async (data) => {
    try {
      const response = await userAPI.post('', data)
      console.log(response)
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }
  const verifyTokenReq = async () => {
    try {
      const response = await userAPI.get('', {
        params: { verifyToken: true },
        headers: { authorization: localStorage.getItem('token') }
      })
      return response.data
    } catch (error) {
      console.log(error.message)
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }
  const answerReq = async (data) => {
    try {
      const token = localStorage.getItem('token')
      const response = await answerApi.post('answer', data, {
        headers: { Authorization: token }
      })
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }

  const activityReq = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await activityApi.get('', {
        headers: { authorization: token }
      })
      return response.data
    } catch (error) {
      console.log(error.message)
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }

  const createAttemptReq = async (data) => {
    try {
      const token = localStorage.getItem('token')
      const response = await attemptApi.post('', data, {
        headers: { Authorization: token }
      })
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }

    return (
      <DataContext.Provider value={{
        // API
        loginReq, registerReq, verifyTokenReq, answerReq, activityReq,
        createAttemptReq,
        // states
        theme, setTheme, user, setUser, course, setCourse,
        activity, setActivity, newAttempt, setNewAttempt,
        attempt, setAttempt,
      }}>
        {children}
      </DataContext.Provider>
    )
  }

  DataProvider.propTypes = null