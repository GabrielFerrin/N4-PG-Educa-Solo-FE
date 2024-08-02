import './QuestionMult.css'
import { useContext, useRef, useState } from "react"
import { DataContext } from "../context/DataContext"
import { useMutation } from "react-query"

const QuestionMult = ({ question, item }) => {
  const { attempt, answerReq } = useContext(DataContext)
  const form = useRef(null)
  const [timer, setTimer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

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
    const data = formData.getAll('answers')
    answerMut.mutate({
      attemptId: attempt._id, itemId: question._id, data
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
    <div className='question-mult-cmp'>
      <h4>{(item + 1) + '. ' + question.data.question}</h4>
      <form ref={form}>
        {question.data.options.map((option, index) => (
          <div key={index} className='options-cmp'>
            <input
              onChange={handleChange}
              type="checkbox"
              id={`option-${index}`}
              name='answers'
              value={option}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </form>
      {showAnswer &&
        <>
          {showLoader ? <span className="loader" ></span> :
            <div className='guardar-respuesta-boton'>
              <button type="button" onClick={handleSubmit}>Se guaró la respuesta</button>
            </div>}
        </>
      }
    </div >
  )
}

QuestionMult.propTypes = null

export default QuestionMult