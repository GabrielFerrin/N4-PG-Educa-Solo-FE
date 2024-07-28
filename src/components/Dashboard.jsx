import { Link, Route, Routes, useNavigate } from "react-router-dom"
import Profile from "./Profile"
import Courses from "./Courses"
import Course from "./Course"
import Activity from "./Activity"
import { DataContext } from "../context/DataContext"
import { useContext } from "react"

const Dashboard = () => {
  const { user, setUser } = useContext(DataContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {user && <h3>Welcome {user.name}</h3>}
      <Link to="course"><button>Course</button></Link>
      <Link to="courses"><button>Courses</button></Link>
      <Link to="profile"><button>Profile</button></Link>
      <Link to="activity"><button>Activity</button></Link>
      <button onClick={handleLogout}>Logout</button>
      <Routes>
        <Route path="courses" element={<Courses />} />
        <Route path="course" element={<Course />} />
        <Route path="profile" element={<Profile />} />
        <Route path="activity" element={<Activity />} />
        <Route path="*" element={<Courses />} />
      </Routes>
    </div>
  )
}

export default Dashboard