import './Courses.css'
import { useContext, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import { useNavigate } from "react-router-dom"
import inicioIcon from '../../public/inicio-icon.svg'
import finIcon from '../../public/fin-icon.svg'

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

  // manejo de fechas
  const getDay = (fecha) => {
    const fechaaa = new Date(fecha)
    const offset = fechaaa.getTimezoneOffset() * 60 * 1000;
    const fechaAjustada = new Date(fechaaa.getTime() + offset);
    const dia = fechaAjustada.getDate().toString().padStart(2, '0');

    return dia
  }

  const getMonth = (fecha) => {
    const fechaaa = new Date(fecha)
    const offset = fechaaa.getTimezoneOffset() * 60 * 1000;
    const fechaAjustada = new Date(fechaaa.getTime() + offset);
    const mes = fechaAjustada.toLocaleString('es-ES', { month: 'long' });

    return mes
  }

  const getYear = (fecha) => {
    const fechaaa = new Date(fecha)
    const offset = fechaaa.getTimezoneOffset() * 60 * 1000;
    const fechaAjustada = new Date(fechaaa.getTime() + offset);
    const year = fechaAjustada.getFullYear();

    return year
  }

  // funcion para calcular el porcentaje del curso completado
  function calcularPorcentajeCompletado(fechaInicio, fechaFin) {
    const fecha1 = new Date(fechaInicio);
    const fecha2 = new Date(fechaFin);
    const fechaHoy = new Date()

    // Duración total del curso en milisegundos
    const duracionTotal = fecha2 - fecha1;

    // Tiempo transcurrido desde el inicio hasta la fecha actual
    const tiempoTranscurrido = fechaHoy - fecha1;
    // Calcular el porcentaje completado
    const porcentajeCompletado = (tiempoTranscurrido / duracionTotal) * 100;

    return porcentajeCompletado > 100 ? 100 : porcentajeCompletado.toFixed(0);
  }

  //funcion para menejar la imagen de manera dinamica
  const getImageSrc = (code) => {
    if (code.includes('MAT')) {
      return '../math-course.png';
    } else if (code.includes('ENG')) {
      return '../english-course.png';
    } else {
      return '../default-course.png'; // Imagen por defecto si no contiene 'math' ni 'eng'
    }
  };

  // manejo dia de la semana
  const getDiaSemana = (fecha) => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaaa = new Date(fecha)
    const offset = fechaaa.getTimezoneOffset() * 60 * 1000;
    const fechaAjustada = new Date(fechaaa.getTime() + offset);
    const diaSemana = diasSemana[fechaAjustada.getDay()];
    return diaSemana
  }

  return (
    <div className="courses-cmp">
      <div className='courses-main-cmp'>
        {user?.courses?.map((course) => (
          <div key={course.courseId._id} className="course-box-cmp" onClick={() => handleCourse(course)}>

            <div className='course-img-cmp'>
              <img src={getImageSrc(course.courseId.code)} alt={course.courseId.code} />
            </div>

            <div className='course-data-cmp'>
              <div className='data-code-course-cmp'>
                <h3>{course.courseId.name}</h3>
                <p style={{ color: course.courseId.color }}>{course.courseId.code}</p>

                <div className='progress-bar-cmp'>
                  <span style={{ color: course.courseId.color }}>{calcularPorcentajeCompletado(course.courseId.starts, course.courseId.ends)}%</span>
                  <div className='progress'>
                    <div className='progress-bar-porcentaje'
                      style={{ width: `${calcularPorcentajeCompletado(course.courseId.starts, course.courseId.ends)}%`, backgroundColor: course.courseId.color }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className='dates-course-cmp'>
                <div className='dates-box'>
                  <img className='icono-date' src={inicioIcon} />
                  <div>
                    <p className='dia-fecha-date' style={{ backgroundColor: course.courseId.color }}>{getDiaSemana(course.courseId.starts)}</p>
                    <p className='number-date'>{getDay(course.courseId.starts)}</p>
                    <p className='mes-fecha-date'>{getMonth(course.courseId.starts)}</p>
                    <p className='year-fecha-date' style={{ backgroundColor: course.courseId.color }}>{getYear(course.courseId.starts)}</p>
                  </div>
                </div>
                <div className='dates-box'>
                  <img className='icono-date' src={finIcon} />
                  <div>
                    <p className='dia-fecha-date' style={{ backgroundColor: course.courseId.color }}>{getDiaSemana(course.courseId.ends)}</p>
                    <p className='number-date'>{getDay(course.courseId.ends)}</p>
                    <p className='mes-fecha-date'>{getMonth(course.courseId.ends)}</p>
                    <p className='year-fecha-date' style={{ backgroundColor: course.courseId.color }}>{getYear(course.courseId.ends)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Courses