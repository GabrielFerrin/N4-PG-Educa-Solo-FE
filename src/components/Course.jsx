import './Course.css'
import { useContext, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"

const Course = () => {
  const { course, setActivity, setNewAttempt, verifyTokenReq,
    getAttemptsReq, attempts } = useContext(DataContext)
  const navigate = useNavigate()

  const verifyTokenMut = useMutation(verifyTokenReq)

  const getAttemptsMut = useMutation(getAttemptsReq)

  const getNumberOfAttempts = (activityId) => {
    return attempts
      .filter(attempt => attempt.activityId === activityId).length
  }

  useEffect(() => {
    if (course && Object.keys(course).length !== 0) {
      localStorage.setItem('courseId', course.courseId._id)
      const activitiesList = course.courseId.activities
        .map(activity => activity.activityId._id)
      getAttemptsMut.mutate({ activitiesList })
    } else {
      verifyTokenMut.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course])

  const handleActivity = (activity) => {
    setActivity(activity)
    setNewAttempt(true)
    navigate("/dashboard/activity")
  }

  const handleAttempts = () => {
    console.log('attempts')
  }

  // manejo de fechas
  const fechaTexto = (fecha) => {
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const fechaaa = new Date(fecha)
    const offset = fechaaa.getTimezoneOffset() * 60 * 1000;
    const fechaAjustada = new Date(fechaaa.getTime() + offset);

    const dia = fechaAjustada.getDate().toString().padStart(2, '0');
    const mesAbreviado = capitalizeFirstLetter(fechaAjustada.toLocaleString('es-ES', { month: 'short' }));
    const year = fechaAjustada.getFullYear();

    return `${mesAbreviado}, ${dia}. ${year}`
  }

  return (
    <div className="course-componente">
      {(course && Object.keys(course).length !== 0) &&
        <>
          <div className="course">
            {(course || Object.keys(course).length !== 0) &&
              <>
                <div className='curse-header-cmp'>
                  <div className='curse-header-name-code'>
                    <h2>{course.courseId.name}</h2>
                    <p><span style={{ color: course.courseId.color }}>{course.courseId.code}</span></p>
                  </div>
                  <div className='curse-header-des-created'>
                    <p>{course.courseId.description}</p>
                    <h4>Created by: <span style={{ color: course.courseId.color }}>{course.courseId.author.name + " " + course.courseId.author.surname}</span></h4>
                  </div>
                </div>

                {course.courseId.activities.map((activity) => (

                  <div key={activity.activityId._id} className="course-cmp" onClick={() => handleActivity(activity.activityId)}
                    style={{ backgroundColor: activity.activityId.color ? activity.activityId.color : '#fffbef' }}>
                    <div className='course-name-box'>
                      <h3 key={activity.activityId._id}>{activity.activityId.name}</h3>
                      <p>{activity.activityId.type}</p>
                    </div>

                    <div className='completado-checkbox'>
                      <input type="checkbox" />
                      <label htmlFor="" style={{ backgroundColor: course.courseId.color }}>Completado</label>
                    </div>

                    <div className='fechas-curse'>
                      <p>Iniciado</p>
                      <h4>{fechaTexto(activity.activityId.starts)}</h4>
                      <p><span>08H00</span></p>
                    </div>

                    <div className='fechas-curse'>
                      <p>Fecha limite</p>
                      <h4>{fechaTexto(activity.activityId.ends)}</h4>
                      <p><span>23H59</span></p>
                    </div>

                    {/* <p>Nota máxima: {activity.activityId.maxGrade}</p> */}
                    <div className='nota-minima'>
                      <p>Nota mínima</p>
                      <h4>{activity.activityId.minGrade}</h4>
                    </div>

                    {/* <p>Intentos permitidos: {activity.activityId.attempts}</p>
              <p>Tiempo: {activity.activityId.timeAllowed} min.</p> */}


                    <div className='boton-intentos'>
                      <button onClick={handleAttempts}>
                        Intentos ({getNumberOfAttempts(activity.activityId._id)})
                      </button>
                    </div>
                  </div>
                ))}
              </>
            }
          </div>
        </>
      }
    </div>
  )
}
export default Course