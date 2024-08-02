import './QuestionVideo.css'
import { useContext, useEffect, useRef, useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder-2"
import VideoPreview from "./VideoPreview"
import { DataContext } from "../context/DataContext"
import { useMutation } from "react-query"
// // icons para el video controller
// import desktop from '../../public/desktop-icon.svg'
// import webCam from '../../public/webcam-icon.svg'
// import playIcon from '../../public/paly-icon.svg'
// import puseIcon from '../../public/pause-icon.svg'
// import recIcon from '../../public/rec-icon.svg'
// import stopIcon from '../../public/stop-icon.svg'

const QuestionVideo = ({ question, item }) => {
  const { answerReq, attempt } = useContext(DataContext)
  const { status, startRecording, stopRecording, mediaBlobUrl,
    previewStream } = useReactMediaRecorder({
      video: true,
      mimeType: "video/mp4"
    })
  const [showPreview, setShowPreview] = useState(false)
  const videoRef = useRef(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

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
      setShowLoader(false)
    },
    onError: (error) => {
      console.log('There was an error', error)
    }
  })

  const handleSubmit = async () => {
    setShowLoader(true)
    setShowAnswer(true)
    if (!mediaBlobUrl) {
      console.log("No video to upload");
      return;
    }
    
    const formData = new FormData()
    formData.append('attemptId', attempt._id)
    formData.append('itemId', question._id)
    formData.append('data', 'placeholder')

    // Fetch the video blob from the mediaBlobUrl
    const videoBlob = await fetch(mediaBlobUrl).then(r => r.blob())
    formData.append('video', videoBlob, 'video.mp4')

    answerMut.mutate(formData)
  }

  return (
    <div className="question-video-cmp">
      <h4>{(item + 1) + '. ' + question.data.prompt}</h4>
      {/* <p>{status}</p> */}
      <div className="video-box-cmp">
        <div className="video-controler-cmp">
          <div className="video-start-stop-cmp">
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
          </div>
          <button onClick={handleSubmit}>Enviar video-respuesta</button>
        </div>
        {showPreview ?
          <VideoPreview stream={previewStream} /> :
          <video src={mediaBlobUrl} controls height={200} width={400} />}
        {/* <button onClick={handleSubmit}>Enviar video-respuesta</button> */}
      </div>
      <div className="record-ctrl-box">
        {showAnswer &&
          <>
            {showLoader ? <span className="loader" ></span> :
              <div className='guardar-respuesta-boton'>
                <button type="button" onClick={handleSubmit}>Se guaró la respuesta</button>
              </div>}
          </>
        }
      </div>
    </div>
  )
}

QuestionVideo.propTypes = null

export default QuestionVideo