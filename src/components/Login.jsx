import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../context/DataContext"
import { useContext, useEffect } from "react"
import { useMutation } from "react-query"

const Login = () => {
  const { loginReq, setUser, verifyTokenReq } =
    useContext(DataContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    token && verifyTokenMut.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // login API
  const loginMut = useMutation(loginReq, {
    onSuccess: (user) => {
      if (user.success) {
        console.log(user)
        localStorage.setItem('token', user.data.token)
        setUser(user.data)
        navigate('/dashboard')
      } else {
        console.log(user.message)
      }
    },
    onError: (error) => {
      console.log('There was an error', error)
    }
  })

  const verifyTokenMut = useMutation(verifyTokenReq, {
    onSuccess: (user) => {
      if (user.success) {
        console.log(user)
        setUser(user.data)
        navigate('/dashboard')
      } else {
        console.log(user.message)
      }
    },
    onError: (error) => {
      console.log('There was an error', error)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    loginMut.mutate(data)
  }

  return (
    <div className="login-cmp">
      <h1>Login</h1>
      <Link to="/home"><button>Back</button></Link>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login