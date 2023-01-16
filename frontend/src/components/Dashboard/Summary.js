import React, { useEffect, useState } from 'react'

function Summary(props) {
  const [owesfrom, setOwesfrom] = useState(props.owesfrom)
  const [owesto, setOwesto] = useState(props.owesto)

  useEffect( () => {
	fetch("http://127.0.0.1:8000/users/", {
		method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
	})
	.then((res) => res.json())
	.then((res) => {
		console.log(res)
	})
  }, [])

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
        {/* <div className='Summary_Section2'>
          <h4>Add Expense</h4>
          <form className='AddExpense'><br/>
				<select value="No selection">
					
				</select>
          </form>
        </div> */}
    </div>
  )
}

export default Summary