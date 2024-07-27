import { Link, Route, Routes } from "react-router-dom"
import Profile from "./Profile"
import Courses from "./Courses"
import Course from "./Course"
import Activity from "./Activity"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Link to="course">Course</Link>
      <Link to="courses">Courses</Link>
      <Link to="profile">Profile</Link>
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