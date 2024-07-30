const QuestionBool = ({ question, item }) => {
  return (
    <>
      <h4>{(item + 1) + '. ' + question.data.statement}</h4>
      <input type="radio" name="answer" value="true" />
      <label htmlFor="true">True</label>
      <input type="radio" name="answer" value="false" />
      <label htmlFor="false">False</label>
    </>
  )
}

QuestionBool.propTypes = null

export default QuestionBool