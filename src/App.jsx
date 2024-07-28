import { useContext } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { DataContext } from './context/DataContext'
import Register from './components/Register'

const App = () => {
  const { theme } = useContext(DataContext)

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