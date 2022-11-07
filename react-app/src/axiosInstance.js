import axios from "axios"

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
        Authorization: `apiKey ${process.env.REACT_APP_API_KEY}`,
    },
})

export default instance
