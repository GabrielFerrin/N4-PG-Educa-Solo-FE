import './Dashboard.css'
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import Profile from "./Profile"
import Courses from "./Courses"
import Course from "./Course"
import Activity from "./Activity"
import { DataContext } from "../context/DataContext"
import { useContext, useEffect } from "react"
import { useMutation } from "react-query"
import Videos from './Videos'

const Dashboard = () => {
  const { user, setUser, verifyTokenReq, theme, setTheme } =
  useContext(DataContext)
  const navigate = useNavigate()

  useEffect(() => {
    Object.keys(user).length === 0 && verifyTokenMut.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifyTokenMut = useMutation(verifyTokenReq, {
    onSuccess: (user) => {
      !user.success && navigate('/login')
    },
    onError: (error) => {
      console.log('There was an error', error)
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser({})
    navigate('/login')
  }

  return (
    <div className="dashboard-cmp">
      <div className='dashboard-background-cmp'>
        <div className="dashboard-left-cmp">
          <img className='main-icon-cmp' src="../public/logo-icon.svg" alt="" />
          <div className="dashboard-menu">
            <div className='dashboard-options'>
              <img className='dashboard-options-icons' src="../cursos-icon.svg" alt="" />
              <Link to="courses"><button className="dashboard-botones">Cursos</button></Link>
            </div>
            {/* <div className='dashboard-options'>
              <img className='dashboard-options-icons' src="../calificaciones-icon.svg" alt="" />
              <button className="dashboard-botones">Calificaciones</button>
            </div> */}
            {/* <div className='dashboard-options'>
              <img className='dashboard-options-icons' src="../alumnos-icon.svg" alt="" />
              <button className="dashboard-botones">Mis Alumnos</button>
            </div> */}
            <div className='dashboard-options'>
              <img className='dashboard-options-icons' src="../perfil-icon.svg" alt="" />
              <Link to="profile"><button className="dashboard-botones">Perfil</button></Link>
            </div>
            <div className='dashboard-options'>
              <img className='dashboard-options-icons' src="../videos-icon.svg" alt="" />
              <Link to="videos"><button className="dashboard-botones">Mis vídeos</button></Link>
            </div>
            <div className='dashboard-options'>
              <img className='dashboard-options-icons' src="../logout-icon.svg" alt="" />
              <button className="dashboard-botones-logout" onClick={handleLogout}>Cerrar Sesión</button>
            </div>

          </div>
          <div className='dashboard-socials-cmp'>
            <a href="https://x.com/HollandJeffreyR" target="_blank" rel="noopener noreferrer">
              <img className="x" src="../x-icon.svg" alt="X" />
            </a>
            <a href="https://www.facebook.com/fundet" target="_blank" rel="noopener noreferrer">
              <img className="facebook" src="../facebook-icon.svg" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/funvalinternacional/" target="_blank" rel="noopener noreferrer">
              <img className="instagram" src="../instagram-icon.svg" alt="Instagram" />
            </a>

          </div>

        </div>
        <div className='dashboard-right-cmp'>
          <div className='nav-bar-cmp'>
            <input type="buscar" placeholder="Buscar" name="buscar" />
            <div className='nav-profile'>
              <button className='theme-toggle-btn'>
                {theme === 'light' ? (
                  <svg onClick={() => setTheme('dark')} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36.19 36.19">
                    <path fill="#1D1C22" d="M18.09,36.19c-.88,0-1.6-.72-1.6-1.6v-4.12c0-.88,.72-1.6,1.6-1.6s1.6,.72,1.6,1.6v4.12c0,.88-.72,1.6-1.6,1.6Zm11.66-4.83c-.41,0-.82-.16-1.13-.47l-2.92-2.92c-.62-.62-.62-1.64,0-2.26,.62-.62,1.64-.62,2.26,0l2.92,2.92c.62,.62,.62,1.64,0,2.26-.31,.31-.72,.47-1.13,.47Zm-23.33,0c-.41,0-.82-.16-1.13-.47-.62-.62-.62-1.64,0-2.26l2.92-2.92c.62-.62,1.64-.62,2.26,0s.62,1.64,0,2.26l-2.92,2.92c-.31,.31-.72,.47-1.13,.47Zm11.66-4.79c-4.67,0-8.47-3.8-8.47-8.47s3.8-8.47,8.47-8.47,8.47,3.8,8.47,8.47-3.8,8.47-8.47,8.47Zm0-13.75c-2.91,0-5.27,2.37-5.27,5.27s2.37,5.27,5.27,5.27,5.27-2.37,5.27-5.27-2.37-5.27-5.27-5.27Zm16.5,6.87h-4.12c-.88,0-1.6-.72-1.6-1.6s.72-1.6,1.6-1.6h4.12c.88,0,1.6,.72,1.6,1.6s-.72,1.6-1.6,1.6Zm-28.87,0H1.6c-.88,0-1.6-.72-1.6-1.6s.72-1.6,1.6-1.6H5.72c.88,0,1.6,.72,1.6,1.6s-.72,1.6-1.6,1.6ZM26.84,10.95c-.41,0-.82-.16-1.13-.47-.62-.62-.62-1.64,0-2.26l2.92-2.92c.62-.62,1.64-.62,2.26,0,.62,.62,.62,1.64,0,2.26l-2.92,2.92c-.31,.31-.72,.47-1.13,.47Zm-17.5,0c-.41,0-.82-.16-1.13-.47l-2.92-2.92c-.62-.62-.62-1.64,0-2.26,.62-.62,1.64-.62,2.26,0l2.92,2.92c.62,.62,.62,1.64,0,2.26-.31,.31-.72,.47-1.13,.47Zm8.75-3.62c-.88,0-1.6-.72-1.6-1.6V1.6c0-.88,.72-1.6,1.6-1.6s1.6,.72,1.6,1.6V5.72c0,.88-.72,1.6-1.6,1.6Z" />
                  </svg>
                ) : (
                  <svg onClick={() => setTheme('light')} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36.09 38.12">
                    <path fill="#e6e9ee" d="M20.25,38.12c-9.72-.11-17.05-5.53-19.47-13.91C-2.23,13.8,3.76,3.5,13.58,.46c.43-.13,.86-.26,1.3-.37,2.1-.52,3.97,1.3,3.5,3.42-.09,.39-.22,.78-.34,1.17-2.46,8.49,2.06,16.85,10.54,19.35,1.41,.41,2.92,.52,4.4,.61,1.21,.08,2.16,.47,2.74,1.53,.58,1.07,.45,2.11-.23,3.12-3.9,5.76-9.34,8.67-15.24,8.84Zm11.02-9.66c-5.95-.64-10.72-3.24-14.17-8.06-3.46-4.83-4.33-10.22-3.02-16.02-5.6,1.86-10.25,7.59-10.22,14.48,.03,6.85,4.55,12.9,11.04,14.79,6.62,1.93,13.15-.86,16.37-5.2Z" />
                  </svg>
                )}
              </button>
              {user && <h3>{user.name}</h3>}
              <img src="../profile-pic.jpg" alt="" />
            </div>
          </div>
          <div className="outlet-wrapper">
            <Outlet />
            <Routes>
              <Route path="courses" element={<Courses />} />
              <Route path="course" element={<Course />} />
              <Route path="profile" element={<Profile />} />
              <Route path="activity" element={<Activity />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="*" element={<Courses />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard