import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Header from "../header/header"

//getting user in setLoginUser after successful login
const Login = ({setLoginUser}) => {

    const history = useHistory()    //instance

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const {email, password} = user
        if(email && password){
            axios.post("http://localhost:9002/login",user)
            .then( res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                history.push("/")
            })
        }
        else{
            alert("Invalid Input")
        }
    }

    return (
        <>
        <Header />
        <div className="login">
            {/* {console.log(user)}; */}
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} placeholder="Enter Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Enter Your Password" onChange={ handleChange }></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={()=> history.push("/register")}>Register</div>
        </div>
        </>
    )
}

export default Login