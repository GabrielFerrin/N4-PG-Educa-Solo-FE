import './QuestionBool.css'
import { useContext, useRef, useState } from "react"
import { DataContext } from "../context/DataContext"
import { useMutation } from "react-query"

const QuestionBool = ({ question, item }) => {
  const { attempt, answerReq } = useContext(DataContext)
  const [timer, setTimer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const form = useRef(null)

  const answerMut = useMutation(answerReq, {
    onSuccess: (response) => {
      setShowLoader(false)
      if (!response.success) {
        alert('No se pudo guardar la respuesta')
      }
    },
    onError: (error) => {
      alert('No se pudo guardar la respuesta')
      console.log(error)
    }
  })

  const handleSubmit = () => {
    setShowAnswer(true)
    const formData = new FormData(form.current)
    // get answers in form of array
    const data = Object.fromEntries(formData)
    answerMut.mutate({
      attemptId: attempt._id, itemId: question._id, data: data.answer
    })
  }

  const handleChange = () => {
    setShowLoader(true)
    if (timer) {
      clearTimeout(timer)
    }
    const newTimer = setTimeout(() => {
      handleSubmit()
    }, 2000)

    // Guardar el nuevo temporizador
    setTimer(newTimer)
  }

  return (
    <>
      <div className="question-bool-cmp">
        <h4>{(item + 1) + '. ' + question.data.statement}</h4>
        <form ref={form}>
          <div className='true-question'>
            <input id="true" onChange={handleChange} type="radio" name="answer" value="true" />
            <label htmlFor="true">True</label>
          </div>
          <div className='false-question'>
            <input id="false" onChange={handleChange} type="radio" name="answer" value="false" />
            <label htmlFor="false">False</label>
          </div>
          {showAnswer &&
            <>
              {showLoader ? <span className="loader" ></span> :
                <div className='guardar-respuesta-boton'>
                  <button type="button" onClick={handleSubmit}>Se guaró la respuesta</button>
                </div>}
            </>
          }
        </form>
      </div >
    </>
  )
}

QuestionBool.propTypes = null

export default QuestionBool