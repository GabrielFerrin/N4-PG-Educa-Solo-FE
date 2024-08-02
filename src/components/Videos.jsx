import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import './Videos.css'
import { useMutation } from 'react-query'

export default function Videos() {
  const { user, getVideosReq, videos } = useContext(DataContext)
  const [token, setToken] = useState('')
  const userAPI = import.meta.env.VITE_USER_API
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
    if (user) {
      getVideosMut.mutate()
    }
    // eslint-disable-next-line
  }, [])

  const getVideosMut = useMutation(getVideosReq)

  return (
    <div className='video-cmp'>
      {videos &&
        videos.map((video) => (
          <div key={video.video} className='video-card-cmp'>
            <div>
              <div className='video-video'>
                <video controls
                  src={userAPI + 'video?video=' + video.video + '&token=' + token + ''}>
                </video>
              </div>
              <div className='video-data'>
                <h4>Fecha: <span className='video-span'>{video.video}</span>  </h4>
                <span>Actividad: <span className='video-span'>{video.activityId}</span> </span>
                <span>Curso: <span className='video-span'>{video.activityId}</span> </span>
              </div>
            </div>
          </div>
        ))
      }








      {/* <div className='video-card-cmp'>
        <div>
          <div className='video-video'>
          </div>
          <div className='video-data'>
            <h4>video ID: </h4>
            <span>fecha: </span>
          </div>
        </div>
      </div>

      <div className='video-card-cmp'>
        <div>
          <div className='video-video'>
          </div>
          <div className='video-data'>
            <h4>video ID: </h4>
            <span>fecha: </span>
          </div>
        </div>
      </div>

      <div className='video-card-cmp'>
        <div>
          <div className='video-video'>
          </div>
          <div className='video-data'>
            <h4>video ID: </h4>
            <span>fecha: </span>
          </div>
        </div>
      </div> */}
    </div>
  )
}
