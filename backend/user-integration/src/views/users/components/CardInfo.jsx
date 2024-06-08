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
            <span>{user.name} {user.lastname}</span>
            <div style={{display:'flex', width:'100%'}}>
              <div style={{display:'flex', width:'50%', flexDirection:'column'}}>
                <p className="job">{user.email}</p>
                <p className="job">{user.borncity}</p>
              </div>
              <div style={{display:'flex', width:'50%', flexDirection:'column'}}>
                <p className="job">{user.interests}</p>
                <p className="job">{user.profession}</p>
              </div>
            </div>
            
          </div>
          
        </div>
        </>
    </>
    
    
  )
}

export default CardInfo