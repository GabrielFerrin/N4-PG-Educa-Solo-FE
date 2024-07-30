import { useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "../context/DataContext"
import { useMutation } from "react-query"

const Register = () => {
  const { registerReq, setUser } = useContext(DataContext)
  const form = useRef(null)
  const navigate = useNavigate()
  const registerMut = useMutation({
    mutationFn: registerReq,
    onSuccess: (user) => {
      console.log(user)
      if (user.success) {
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
  const handleSubmit = (e) => {
    const formData = new FormData(form.current)
    const data = Object.fromEntries(formData)
    e.preventDefault()
    registerMut.mutate(data)
  }
  return (
    <div className="register">
      <h1>Register</h1>
      <Link to="/home"><button>Back</button></Link>
      <form ref={form}>
        <input type="text" placeholder="username" name="username"/>
        <input type="password" placeholder="password" name="hash" />
        <button id="code" type="button" onClick={handleSubmit}>Generate code</button>
        <input type="number" placeholder="code" name="code" />
        <button id="register" type="button" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}
export default Register