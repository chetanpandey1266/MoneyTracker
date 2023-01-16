import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='Navbar'>
        <Link to="/" className='Navbar_logo'>
            <h2><span>Money</span>Tracker</h2>
        </Link>
        <div className='Navbar_side'>
            <Link to="/signin" className='signin'>
                <p>Signin</p>
            </Link>
            <Link to="/signup" className='signup'>
                <p>Signup</p>
            </Link>
        </div>
    </div>
  )
}

export default Navbar