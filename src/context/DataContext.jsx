import axios from "axios"
import { createContext, useState } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  // theme
  const [theme, setTheme] = useState('light')
  // API
  const [user, setUser] = useState({})
  const dataAPI = axios.create({ baseURL: import.meta.env.VITE_USER_API })
  const serverError = 'El servidor no respondió. Intente nuevamente.'
  const loginReq = async (data) => {
    try {
      const response = await dataAPI.post('login', data)
      return response.data
    } catch (error) {
      if (error.code === 'ERR_NETWORK')
        return { success: false, message: serverError }
      return error.response.data
    }
  }
  const registerReq = async (data) => {
    try {
      const response = await dataAPI.post('', data)
      console.log(response)
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
      loginReq, registerReq, user, setUser,
      // theme
      theme, setTheme
    }}>
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = null