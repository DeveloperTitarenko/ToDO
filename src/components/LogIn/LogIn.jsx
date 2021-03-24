import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom"
import './login.scss'

const LogIn = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState()

  const history = useHistory()



  const checkData = () => {
    const token = localStorage.getItem('token')


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