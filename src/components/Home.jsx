import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home-cmp">
      <h1>Home</h1>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  )
}
export default Home