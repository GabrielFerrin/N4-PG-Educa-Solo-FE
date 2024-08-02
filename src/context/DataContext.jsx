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
  const [attempts, setAttempts] = useState([])
  const [newAttempt, setNewAttempt] = useState(false)
  const [videos, setVideos] = useState([])
  const userAPI = axios
    .create({ baseURL: import.meta.env.VITE_USER_API })
  const answerApi = axios
    .create({ baseURL: import.meta.env.VITE_ANSWER_API })
  const activityApi = axios
    .create({ baseURL: import.meta.env.VITE_ACTIVITY_API })
  const attemptApi = axios
    .create({ baseURL: import.meta.env.VITE_ATTEMPT_API })
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
      localStorage.setItem('token', response.data.data.token)
      if (Object.keys(user).length === 0) {
        setUser(response.data.data)
        const currentCourseId = localStorage.getItem('courseId')
        if (currentCourseId) {
          const curretcourse = response.data.data.courses
            .find((course) => course.courseId._id === currentCourseId)
          setCourse(curretcourse)
        }
      }
      return response.data
    } catch (error) {
      console.log(error.message)
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.message
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

  const getAttemptReq = async (attemptId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await attemptApi.get('', attemptId, {
        headers: { Authorization: token }
      })
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }

  const getAttemptsReq = async (data) => {
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams(data).toString()
      const response = await attemptApi.get(`all?${params}`, {
        headers: { Authorization: token }
      });
      setAttempts(response.data.data)
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }

  const closeAttemptReq = async (attemptId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await attemptApi.post('close', attemptId, {
        headers: { Authorization: token }
      })
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }

  const getVideosReq = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await userAPI.get('videos', {
        headers: { Authorization: token }
      })
      setVideos(response.data.videos)
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
      createAttemptReq, getAttemptReq, closeAttemptReq, getAttemptsReq,
      getVideosReq,
      // states
      theme, setTheme, user, setUser, course, setCourse,
      activity, setActivity, newAttempt, setNewAttempt,
      attempt, setAttempt, attempts, setAttempts,
      videos, setVideos
    }}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = null