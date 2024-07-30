import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import { useNavigate } from "react-router-dom"

const Course = () => {
  const { course, setActivity, setNewAttempt } = useContext(DataContext)
  const navigate = useNavigate()

  const handleActivity = (activity) => {
    setActivity(activity)
    setNewAttempt(true)
    navigate("/dashboard/activity")
  }

  return (
    <div className="course">
      {course &&
        <>
          <h2>Courso: {course.name}</h2>
          <p>{course.code}</p>
          <p>{course.description}</p>
          <p>Created by: {course.author.name + " " + course.author.surname}</p>
          <h3>Contenido</h3>
          {course.activities.map((activity) => (
            <div key={activity.activityId._id}>
              <h3 key={activity.activityId._id}>{activity.activityId.name}</h3>
              <p>Nota máxima: {activity.activityId.maxGrade}</p>
              <p>Nota mínima: {activity.activityId.minGrade}</p>
              <p>Intentos permitidos: {activity.activityId.attempts}</p>
              <p>Tiempo: {activity.activityId.timeAllowed} min.</p>
              <button onClick={() => handleActivity(activity.activityId)}>Comenzar</button>
            </div>
          ))}
        </>
      }
    </div>
  )
}
export default Course