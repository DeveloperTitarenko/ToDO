import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom"
import './login.scss'

const LogIn = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState()

  const history = useHistory()

  useEffect(() => {
    const access = JSON.parse(localStorage.getItem('access'))
    access === true ? history.push('/todo'): history.push('/')
  },[])

  const checkData = () => {
    if(login === 'admin' && password === '1234'){
    localStorage.setItem('access', JSON.stringify(true))
      history.push("/todo")
    }else{
      localStorage.setItem('access', 'false')
      history.push("/")
    }
  }

  return(
    <div className="log-in">
      <h2>Log in</h2>
      <input type="text" placeholder="Login" login={login}  onChange={(event => setLogin(event.target.value))}/>
      <input type="password" placeholder="Password" password={password} onChange={(event => setPassword(event.target.value))}/>
      <button onClick={checkData}>Log in</button>
    </div>
  )
}
export default LogIn;