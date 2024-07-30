import { Link, Route, Routes, useNavigate } from "react-router-dom"
import Profile from "./Profile"
import Courses from "./Courses"
import Course from "./Course"
import Activity from "./Activity"
import { DataContext } from "../context/DataContext"
import { useContext, useEffect } from "react"
import { useMutation } from "react-query"

const Dashboard = () => {
  const { user, setUser, verifyTokenReq } = useContext(DataContext)
  const navigate = useNavigate()

  useEffect(() => {
    Object.keys(user).length === 0 && verifyTokenMut.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifyTokenMut = useMutation(verifyTokenReq, {
    onSuccess: (user) => {
      if (user.success) {
        setUser(user.data)
        console.log(user)
        localStorage.setItem('token', user.data.token)
      } else {
        navigate('/login')
      }
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
    <div className="dashboard">
      <h1>Dashboard</h1>
      {user && <h3>Welcome {user.name}</h3>}
      <Link to="courses"><button>Courses</button></Link>
      <Link to="profile"><button>Profile</button></Link>
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