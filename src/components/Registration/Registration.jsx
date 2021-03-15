import React, {useState,useEffect} from "react"
import './registration.scss'
import {useHistory} from 'react-router-dom'


const Registration = () => {
  const history = useHistory();
  const [newLogin, setNewLogin] = useState()
  const [newPassword, setNewPassword] = useState()
  return(
      <div className="registration">
        <span>Registration</span>
        <input type="text" placeholder="Login" />
        <input type="password" placeholder="Password"/>
        <input type="password" placeholder="confirm Password"/>
        <button>Registration</button>
      </div>
    )
}

export default Registration;