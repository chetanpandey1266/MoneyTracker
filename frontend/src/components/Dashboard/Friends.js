import React, {useState, useEffect} from 'react'

function Friends(props) {
  const [friendsEmail, setFriendsEmail] = useState(props.friends.friends_email)
  const [friendsId, setFriendsId] = useState(props.friends.friends_id)

  useEffect(() => {
    console.log(props.friends)
  })

  return (
    <div className='Friends'>
      <div className='Friends_content1'>
        {
          friendsEmail.map((row, index) => {
            return <p>{row} {friendsId[index]}</p>
          })
        }
      </div>
      <div className='Friends_content2'>
        <h4>Add Friends</h4>
      </div>
    </div>
  )
}

export default Friends