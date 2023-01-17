import React, { useEffect, useState } from 'react'

function Summary(props) {
  const [owesfrom, setOwesfrom] = useState(props.owesfrom)
  const [owesto, setOwesto] = useState(props.owesto)
  const [selectedFriend, setSelectedFriend] = useState("Select Friend")
  const [amount, setAmount] = useState(0)

  const addExpense = () => {
    const token = localStorage.getItem("token").substring(6)

    if(selectedFriend !== "Select Friend" && amount > 0) {
      fetch("http://127.0.0.1:8000/addexpense", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": selectedFriend,
          "token": token,
          "amount": amount
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
    }
  }

  return (
    <div className='Summary'>
        <div className='Summary_Section1'>
            <div className='owesFrom'>
              <h4>Owes from....</h4>
              <div>
                {
                  owesfrom.map(element => {
                    return <p>{element.receiver_email}   {element.borrowed}</p>
                  })
                }
              </div>
            </div>
            <div className='owesTo'>
              <h4>Owes to.....</h4>
              <div>
                {
                  owesto.map((element )=> {
                    return <p>{element.borrower_email}  {element.borrowed}</p>
                  })
                }
              </div>
            </div>
        </div>
        <div className='Summary_Section2'>
          <h4>Add Expense</h4>
          <div className="Expense_Section1">
            <h5>Select Friend</h5>
            <div class="dropdown">
              <button class="dropbtn">{selectedFriend}</button>
              <div class="dropdown-content">
                  {props.friends.friends_email && props.friends.friends_email.map((element, index)=> {
                      return <a onClick={() => {
                        setSelectedFriend(element)
                      }}>{element}</a>
                  })}
              </div>
            </div>
          </div>
          <div className="Expense_Section2" >
            <h5>Expense</h5>
            <input type="text" style={{width:"30rem", marginTop:"1rem" }} placeholder="Enter Expense"onChange={e => setAmount(e.target.value)} name="expense" required />
            <button className='addexpensebtn' onClick={addExpense}>Add expense</button>
          </div>
        </div>
        
    </div>
  )
}

export default Summary