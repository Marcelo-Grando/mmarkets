import axios from 'axios'

export const sendCategory = async (category, market) => 
    await axios.post(`http://localhost:3000/api/categories/${market}`,{category:category})
 
export const getCategories = async (market) => 
    await axios.get(`http://localhost:3000/api/categories/${market}`)

export const deleteCategory = async (market,category_id) => 
    await axios.delete(`http://localhost:3000/api/categories/${market}/${category_id}`)
