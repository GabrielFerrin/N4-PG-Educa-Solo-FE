const QuestionMult = ({ question, item }) => {
  return (
    <>
      <h4>{(item + 1) + '. ' + question.data.question}</h4>
      {question.data.options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`option-${index}`}
            name={`option-${index}`}
            value={option}
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
    </>
  )
}

QuestionMult.propTypes = null

export default QuestionMult