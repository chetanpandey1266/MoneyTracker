import React, { useEffect, useState } from 'react'

function Summary(props) {
  const [owesfrom, setOwesfrom] = useState(props.owesfrom)
  const [owesto, setOwesto] = useState(props.owesto)

  useEffect( () => {
    console.log(owesfrom, owesto)
  }, [])
  return (
    <div className='Summary'>
        <div className='Summary_Section1'>
            <div className='owesFrom'>
              <h4>Owes from....</h4>
              <ul>
                {
                  owesfrom.forEach(element => {
                    return <il>{element.receiver_email} {element.borrowed}</il>
                  })
                }
              </ul>
            </div>
            <div className='owesTo'>
              <h4>Owes to.....</h4>
              <ul>
                {
                  owesto.forEach(element => {
                    return <il>{element.borrower_email} {element.borrowed}</il>
                  })
                }
              </ul>
            </div>
        </div>
        <div className='Summary_Section2'>
          <h4>Add Expense</h4>
          {/* <form className='AddExpense'><br/>

          </form> */}
        </div>
    </div>
  )
}

export default Summary