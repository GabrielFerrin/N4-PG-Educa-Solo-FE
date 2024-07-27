import { useContext } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { DataContext } from './context/DataContext'

function App() {
  const { theme, setTheme } = useContext(DataContext)

  return (
    <div className={`app ${theme}`}>
      <div className="body-app">
        <button onClick={() => setTheme('light')}>Claro</button>
        <button onClick={() => setTheme('dark')}>Oscuro</button>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
