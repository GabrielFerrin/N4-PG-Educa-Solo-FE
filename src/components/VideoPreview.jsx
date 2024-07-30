import { useEffect, useRef } from 'react'

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} autoPlay height={200} width={400} />
};

VideoPreview.propTypes  = null

export default VideoPreview