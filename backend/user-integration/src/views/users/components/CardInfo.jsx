import React from 'react'
import userImage from '../../../assets/userImage.svg'
import './CardInfo.css'

const CardInfo = ({user}) => {
  return (
    <>
    <>
        <div className="cardInfo">
          <div className="card-border-top">
          </div>
          <div className="img"><img src={userImage} width={100}></img>
          </div>
          <div className='other'>
            <span>{user.name}</span>
            <p className="job">{user.email}</p>
          </div>
          
        </div>
        </>
    </>
    
    
  )
}

export default CardInfo