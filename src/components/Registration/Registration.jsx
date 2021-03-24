import React, {useState} from "react"
import './registration.scss'
import axios from "axios"
import {useHistory} from "react-router-dom"
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
})

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const history = useHistory()

const registration = () => {
 if(password === confirmPassword){
   axiosInstance.post("/register", {email, password})
     .then((response) => {
       setEmail('')
       setPassword('')
       setConfirmPassword('')
       localStorage.setItem('token', response.data.token)
       history.push("/todo")
     })
     .catch((err) => {
       console.log(err)
     })
 }else{
   console.log('Password mismatch')
 }
}
  return(
      <div className="registration">
        <span>Registration</span>
        <input value={email} type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input value={confirmPassword} type="password" placeholder="confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button onClick={registration}>Registration</button>
      </div>
    )
}

export default Registration;