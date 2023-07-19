import React from 'react'

export default function SellerCard({name, lastname, email, dni}) {

  return (
    <div className='seller-card'>
        <h4>{`${name} ${lastname}`}</h4>
        <h6>{email}</h6>
        <h6>{`DNI: ${dni}`}</h6>
        <button className='btn-update'>update</button>
        <button className='btn-delete'>delete</button>
    </div>
  )
}
