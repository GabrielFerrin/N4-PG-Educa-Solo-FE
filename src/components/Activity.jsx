import './Activity.css'
import { useContext, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import QuestionMult from "./QuestionMult"
import QuestionVideo from "./QuestionVideo"
import QuestionBool from "./QuestionBool"
import { useMutation } from "react-query"
import { Link } from 'react-router-dom'

const Activity = () => {
  const { activity, newAttempt, setAttempt, createAttemptReq,
    closeAttemptReq, attempt } =
    useContext(DataContext)

  const createAttemptMut = useMutation(createAttemptReq, {
    onSuccess: (data) => {
      setAttempt(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const closeAttemptMut = useMutation(closeAttemptReq, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (newAttempt) {
      createAttemptMut.mutate({ activityId: activity._id })
    }
    // eslint-disable-next-line
  }, [newAttempt])

  const handleClose = () => {
    console.log(attempt)
    closeAttemptMut.mutate({ attemptId: attempt._id })
  }

  return (
    <div className="activity-cmp">
      <div className="activity-info-cmp">
        <div>
          <h3>{activity.name}</h3>
          <p>Tiempo: <span className="activity-tiempo">{activity.timeAllowed}m</span></p>
        </div>
        <div className="activity-grade-attempts">
          <p>Nota minima: <span>{activity.minGrade}</span></p>
          <p>Maximo de intentos: <span>{activity.attempts}</span></p>
        </div>
      </div>
      {activity.items.map((item, i) => (
        <div key={item._id}>
          {(() => {
            switch (item.type) {
              case 'mult':
                return <QuestionMult question={item} item={i} />
              case 'video':
                return <QuestionVideo question={item} item={i} />
              // case 'quiz':
              //   return (
              //     <div>
              //       <h3>{(i + 1) + '. Quiz'}</h3>
              //       {/* Render quiz content here */}
              //     </div>
              //   )
              case 'bool':
                return <QuestionBool question={item} item={i} />
              default:
                return null
            }
          })()}
        </div>
      ))}
      <div className="wrapper">
        <Link to="/dashboard/courses">
          <button onClick={handleClose}>
            Dar por terminado el examen
          </button></Link>
      </div>
    </div>
  )
}
export default Activity