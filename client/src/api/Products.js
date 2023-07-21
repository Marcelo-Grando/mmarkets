import axios from "axios"

export const getProducts = async () => 
    await axios.get(`http://localhost:3000/api/products/1`)

export const findProduct = async (product) => 
    await axios.get(`http://localhost:3000/api/products/1/${product}`)

export const sendProduct = async (product) => 
    await axios.post(`http://localhost:3000/api/products/1`, product)
