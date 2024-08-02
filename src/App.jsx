import { useContext, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { DataContext } from './context/DataContext'
import Register from './components/Register'
import getSystemTheme from './helpers/theme'

const App = () => {
  const { theme, setTheme } = useContext(DataContext)

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (!localTheme) {
      const systemTheme = getSystemTheme()
      systemTheme === 'dark' ? setTheme('dark') : setTheme('light')
    } else {
      setTheme(localTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`app ${theme}`}>
      <div className="body-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App