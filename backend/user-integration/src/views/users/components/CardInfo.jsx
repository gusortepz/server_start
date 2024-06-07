import React from 'react'
import userImage from '../../../assets/userImage.svg'

const CardInfo = ({user}) => {
  return (
    <div style={{
        width: '400px',
        height: '150px',
        backgroundColor: 'white',
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        padding: '10px',
        margin: '20px'
    }}
    >
        <img src={userImage} width={40} alt='avatar'/>
        <p>Nombre: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Direccion: {user.address}</p>
    </div>
  )
}

export default CardInfo