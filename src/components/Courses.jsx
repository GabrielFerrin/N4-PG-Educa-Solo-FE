import { useContext, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import { useNavigate } from "react-router-dom"

const Courses = () => {
  const { user, setCourse } = useContext(DataContext)
  const navigate = useNavigate()

  useEffect(() => {
    Object.keys(user).length === 0 && navigate("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCourse = (course) => {
    setCourse(course)
    navigate("/dashboard/course")
  }

  return (
    <div className="courses-cmp">
      <h1>Courses</h1>
      {user?.courses?.map((course) => (
        <div key={course.courseId._id}>
          <h3>{course.courseId.name}</h3>
          <p>{course.courseId.code}</p>
          <p>{course.courseId.description}</p>
          <p>
            Created by: {course.courseId.author.name +
            " " + course.courseId.author.surname}
          </p>
          <button onClick={() => handleCourse(course.courseId)}>Ver</button>
        </div>
      ))}
    </div>
  )
}
export default Courses