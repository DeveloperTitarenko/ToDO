import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom"
import './login.scss'
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
})

const LogIn = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState()
  const history = useHistory()



  const checkData = () => {
    axiosInstance.post('/login', {email: login, password})
      .then(response => {
        const token = localStorage.setItem('token', response.data.token)
        history.push('/todo')
      })
      .catch(err => console.log(err))
  }

  return(
    <div className="log-in">
      <h2>Log in</h2>
      <input type="text" placeholder="Login" login={login}  onChange={(event => setLogin(event.target.value))}/>
      <input type="password" placeholder="Password" password={password} onChange={(event => setPassword(event.target.value))}/>
      <div className="btn">
        <button onClick={checkData}>Log in</button>
        <button onClick={() => {
          history.push('/registration')
        }}>Registration</button>
      </div>
    </div>
  )
}
export default LogIn;