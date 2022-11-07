import axios from "axios"

let tenantId = null

const gdnAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GDN_API_URL.replace(/\/+$/, ""),
    headers: {
        authorization: `apikey ${process.env.REACT_APP_API_KEY}`,
    },
})

export const gdnUrl = () => process.env.REACT_APP_GDN_API_URL.replace(/\/+$/, "")

export const fabricName = () => process.env.REACT_APP_FABRIC_NAME

export const getTenantId = () => {
    if (!tenantId) {
        const apiKey = process.env.REACT_APP_API_KEY
        let apiKeyArr = apiKey.split(".")
        apiKeyArr.splice(-2, 2)
        tenantId = apiKeyArr.join(".")
    }

    return tenantId
}

export default gdnAxiosInstance
