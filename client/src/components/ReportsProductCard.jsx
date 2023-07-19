import React from 'react'

export default function ReportsProductCard({product}) {
  return (
    <div>
        <h4>product: {product.product}</h4>
        <p>description: {product.description}</p>
        <p>quantify: {product.quantify}</p>
        <p>amount: $ {product.amount}</p>
        <p>percentage: % {product.percentage}</p>
    </div>
  )
}
