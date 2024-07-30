import { useContext, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import QuestionMult from "./QuestionMult"
import QuestionVideo from "./QuestionVideo"
import QuestionBool from "./QuestionBool"
import { useMutation } from "react-query"

const Activity = () => {
  const { activity, newAttempt, createAttemptReq } = useContext(DataContext)

  const createAttemptMut = useMutation(createAttemptReq, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (newAttempt) {
      console.log('new attempt')
      createAttemptMut.mutate({activityId: activity._id})
    }
    // eslint-disable-next-line
  }, [newAttempt])

  return (
    <div className="activity-cmp">
      <h1>Activity</h1>
      <p>{activity.name}</p>
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
    </div>
  )
}
export default Activity