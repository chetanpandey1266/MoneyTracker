import React, { useRef, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [ref, setRef] = useState()

    const signup = (e) => {
        e.preventDefault()
        let status_code = 200
        fetch("http://127.0.0.1:8000/register/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "password2": password2
            })
        }).then(res => {
            status_code = res.status
            return res.json()
        })
        .then(res => {
            if(status_code == 201) {
                console.log('success')
                toast.success("Successfully Registered")
                ref.reset()
            } else if(status_code == 400) {
                if(res.username) toast.error('A user with same email already exist')
                if(res.password) toast.error(res.password[0])
                ref.reset()
            }
        })
    }

    return (
        <div className='Signup'>
            <ToastContainer />
            <form className="Sign_form" ref={(el) => setRef(el)}>
                <div className='Sign_logo'>
                    <h1>Money</h1>
                    <span>Tracker</span>
                </div>
                <div class="Sign_container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <br/>
                    <label for="name"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="name" onChange={e => setUsername(e.target.value)} required />

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" onChange={e => setEmail(e.target.value)} required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" onChange={e => setPassword(e.target.value)} required />

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" onChange={e => setPassword2(e.target.value)} required />

                    <div className="Sign_btns">
                        <button type="submit" onClick={signup} className="signbtn">Sign Up</button>
                        <button type="button" className="cancelbtn">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup