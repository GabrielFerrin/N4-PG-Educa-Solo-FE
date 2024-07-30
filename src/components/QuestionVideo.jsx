import { useContext, useEffect, useRef, useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder-2"
import VideoPreview from "./VideoPreview"
import { DataContext } from "../context/DataContext"
import { useMutation } from "react-query"

const QuestionVideo = ({ question, item, activityId }) => {
  const { answerReq } = useContext(DataContext)
  const { status, startRecording, stopRecording, mediaBlobUrl,
    previewStream } = useReactMediaRecorder({
      video: true,
      mimeType: "video/mp4"
    })
  const [showPreview, setShowPreview] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    console.log(question)
  }, [question])

  useEffect(() => {
    if (status === 'recording') {
      setShowPreview(true)
    } else {
      setShowPreview(false)
    }
  }, [status])

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  const answerMut = useMutation(answerReq, {
    onSuccess: (response) => {
      console.log(response)
    },
    onError: (error) => {
      console.log('There was an error', error)
    }
  })

  const handleSubmit = async () => {
    if (!mediaBlobUrl) {
      console.log("No video to upload");
      return;
    }
  
    const formData = new FormData()
    formData.append('attemptId', activityId)
    formData.append('itemId', question._id)
    formData.append('data', 'placeholder')
    
    // Fetch the video blob from the mediaBlobUrl
    const videoBlob = await fetch(mediaBlobUrl).then(r => r.blob())
    formData.append('video', videoBlob, 'video.mp4')
    
    answerMut.mutate(formData)
  }

  return (
    <>
      <h4>{(item + 1) + '. ' + question.data.prompt}</h4>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {showPreview ?
        <VideoPreview stream={previewStream} /> :
        <video src={mediaBlobUrl} controls height={200} width={400} />}
      <button onClick={handleSubmit}>Enviar video-respuesta</button>
    </>
  )
}

QuestionVideo.propTypes = null

export default QuestionVideo