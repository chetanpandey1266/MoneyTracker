import React, { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ref, setRef] = useState()
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        let ok = true
        localStorage.clear()
        fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        })
        .then(res => {
            if(res.status == 404){
                ok = false
            }
            return res.json()
        })
        .then(res => {
            if(ok){
                console.log()
                localStorage.setItem("token", `Token ${res.token}`)
                toast.success("Successfully logged in")
                ref.reset()
                navigate('/user', {replace:true});
            }else {
                toast.error(res.non_field_errors[0])
                ref.reset()
            }
        })
    }

    return (
        localStorage.getItem("token")? <Navigate to="/user" />:
        <div className='Signin'>
            <ToastContainer />
            <form className="Sign_form" ref={(el) => setRef(el)}>
                <div className='Sign_logo'>
                    <h1>Money</h1>
                    <span>Tracker</span>
                </div>
                <div class="Sign_container">
                    <h1>Log In</h1>
                    <p>Please fill in this form to sign in to your account</p>
                    <br></br>
             
                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" onChange={e => setEmail(e.target.value)}  required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" onChange={e=>setPassword(e.target.value)} required />

                    <div className="Sign_btns">
                        <button type="submit" onClick={login} className="signbtn">Sign In</button>
                        <button type="button" className="cancelbtn">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signin