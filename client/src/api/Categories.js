import axios from 'axios'

export const sendCategory = async (category, market) => {
    await axios.post(`http://localhost:3000/api/categories/${market}`,{category:category})
    .then(response => console.log(response.data))
}

export const getCategories = async (market) => 
    await axios.get(`http://localhost:3000/api/categories/${market}`)
