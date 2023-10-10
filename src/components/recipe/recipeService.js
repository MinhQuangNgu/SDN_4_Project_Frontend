import axios from "axios"

export const getRecipe = async () => {
    return await axios.get(`http://localhost:5000/recipe`)
}