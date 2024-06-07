import React from 'react'

const PrevDescription = ({description}) => {
    console.log(description)
  return (
    <div>
        {description?.map((des,idx) => (
            <p key={idx}>{des.description}</p>
        ))}
    </div>
  )
}

export default PrevDescription;