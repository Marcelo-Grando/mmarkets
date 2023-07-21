import axios from 'axios'

export const sendCategory = async (category) => {
    await axios.post(`http://localhost:3000/api/categories/1`,{category:category})
    .then(response => console.log(response.data))
}

export const getCategories = async () => 
    await axios.get(`http://localhost:3000/api/categories/1`)
