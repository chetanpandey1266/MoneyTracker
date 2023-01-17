import React, {useState, useEffect} from 'react'


function FriendsDetail(props) {


  const deleteFriend = () => {
    const token = localStorage.getItem("token").substring(6)
    fetch(`http://127.0.0.1:8000/friends/${token}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			},
      body: JSON.stringify({
        "email": props.row
      })
		})
    .then(res => res.json())
    .then(res => console.log(res))
  }

  return (
    <div className='FriendsDetail'>
      <p>{props.row}</p>
      <button onClick={deleteFriend}>Remove</button>
    </div>
  )
}

function Friends(props) {
  const [friendsEmail, setFriendsEmail] = useState(props.friends.friends_email)
  const [friendsId, setFriendsId] = useState(props.friends.friends_id)
  const [allUsers, setAllUsers] = useState(props.users)
  const [selectedUser, setSelectedUser] = useState("Add New Friend")


  const addFriend = () => {
    const token = localStorage.getItem("token").substring(6)
    fetch(`http://127.0.0.1:8000/friends/${token}`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
      body: JSON.stringify({
        "email": selectedUser
      })
		})
    .then(res => res.json())
    .then(res => console.log(res))
  }

  return (
    <div className='Friends'>
      <div className='Friends_content1'>
        <h4>Friends</h4>
        {
          friendsEmail!=null && friendsEmail.map((row, index) => {
            return <p><FriendsDetail row={row} /></p>
          })
        }
      </div>
      <div className='Friends_content2'>
        <h4>Add Friends</h4>
        <div class="dropdown">
          <button class="dropbtn">{selectedUser}</button>
          {/* {selectedUser} */}
          <div class="dropdown-content">
              {allUsers.map((element, index)=> {
                // console.log(element.email)
                if (!friendsEmail.includes(element.email))
                  return <a onClick={() =>{
                    setSelectedUser(element.email)
                  }}>{element.email}</a>
              })}
          </div>
        </div>
        <button class="addfriendbtn" onClick={addFriend}>Add</button>
      </div>
    </div>
  )
}

export default Friends