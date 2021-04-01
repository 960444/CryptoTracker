import axios from 'axios'

//Create a base url handler
const instance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
})

export default instance