import React from 'react'

export default function SellerCard({seller_id, name, lastname, email, dni, removeSeller}) {

  return (
    <div className='seller-card'>
        <h4>{`${name} ${lastname}`}</h4>
        <h6>{email}</h6>
        <h6>{`DNI: ${dni}`}</h6>
        <button className='btn-update'>update</button>
        <button onClick={() => removeSeller(seller_id)} className='btn-delete'>delete</button>
    </div>
  )
}
