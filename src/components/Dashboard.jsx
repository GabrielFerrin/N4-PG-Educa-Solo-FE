import { Outlet, Route, Routes } from "react-router-dom"
import CourseItem from "./CourseItem"
import Profile from "./Profile"
import Courses from "./Courses"
import Course from "./Course"

const Dashboard = () => {
  return (
    <div className="dashboard">
      Dashboard
      <Outlet />
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path='/course' element={<Course />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/course-item' element={<CourseItem />} />
      </Routes>
    </div>
  )
}
export default Dashboard