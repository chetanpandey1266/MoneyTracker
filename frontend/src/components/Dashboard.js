import React, { useState, useEffect } from 'react'
import Friends from './Dashboard/Friends';
import Groups from './Dashboard/Groups';
import Summary from './Dashboard/Summary'
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';


function Dashboard() {
	const [opt, setOpt] = useState(0)
	const [authenticated, setAuthentication] = useState(localStorage.getItem("token") ? true : null)
	const [owesFrom, setOwesFrom] = useState([]) // expense table
	const [owesTo, setOwesTo] = useState([]) // expense table
	const [friends, setFriends] = useState({}) // friends table
	const [allUsers, setAllUsers] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token").substring(6)
		// to get all the friends
		fetch(`http://127.0.0.1:8000/friends/${token}`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then((res) => {
				setFriends(res)
			})
			.catch((err) => {
				console.log(err)
			})

		fetch(`http://127.0.0.1:8000/expense/${token}`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then((res) => {
				setOwesFrom(res.owes_from)
				setOwesTo(res.owes_to)
			}).catch(err => console.log(err))

		fetch("http://127.0.0.1:8000/users/", {
			method: "GET",
				headers: {
				'Content-Type': 'application/json'
				},
		})
			.then((res) => res.json())
			.then((res) => {
				setAllUsers(res)
			})
	}, [])

	const logout = () => {
		localStorage.clear()
		navigate("/signin")
	}

	return (
		!authenticated ? <Navigate to="/signin/" /> : <div className='Dashboard'>
			<div className='Dashboard_Navbar'>
				<h1>Money<span>Tracker</span></h1>
				<button className='Dashboard_Navbar_profile' onClick={logout}>
					<p>Logout</p>
				</button>
			</div>
			<div className='Dashboard_Main'>
				<div className='Dashboard_Sidebar'>
					<div onClick={() => setOpt(0)}>
						<i class="fa fa-book"></i>
						<p>Summary</p>
					</div>
					<div onClick={() => setOpt(1)}>
						<i class="fa fa-user-plus" aria-hidden="true"></i>
						<p>Friends</p>
					</div>
					<div onClick={() => setOpt(2)}>
						<i class="fa fa-users" aria-hidden="true"></i>
						<p>Groups</p>
					</div>
				</div>
				<div className='Dashboard_Display'>
					{opt === 0 && <Summary owesfrom={owesFrom} owesto={owesTo} friends={friends} />}
					{opt === 1 && <Friends friends={friends} users={allUsers} />}
					{opt === 2 && <Groups />}
				</div>

			</div>
		</div>
	)
}

export default Dashboard