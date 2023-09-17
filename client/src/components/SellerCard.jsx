import React from 'react'

export default function SellerCard({seller_id, name, lastname, email, dni, removeSeller}) {

  return (
    <div className='col seller-card p-2 m-1'>
        <h4>{`${name} ${lastname}`}</h4>
        <h6>{email}</h6>
        <h6>{`DNI: ${dni}`}</h6>
        <div className='row m-1'>
        <button className='col btn btn-info mx-1 p-0'>update</button>
        <button onClick={() => removeSeller(seller_id)} className='col btn btn-danger mx-1 p-1'>delete</button>
        </div> 
    </div>
  )
}
