import gdnAxiosInstance, { fabricName, gdnUrl, getTenantId } from "./gdn"

const getWsConnectionOtp = async () => {
    try {
        const { data } = await gdnAxiosInstance.post("/apid/otp")
        return data.otp
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createStream = async (streamName, isGlobal = true) => {
    try {
        const { data } = await gdnAxiosInstance.post(
            `/_fabric/${fabricName()}/_api/streams/${streamName}?global=${isGlobal}`,
        )

        if (data?.result["stream-id"]) {
            console.log("Stream Id: \t", data?.result["stream-id"])
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createStreamProducer = async (streamName) => {
    try {
        let ws
        const wsConnectionOtp = await getWsConnectionOtp()
        const urlWithoutProtocol = gdnUrl().replace("https://", "")
        const tenant = getTenantId()
        const fabric = `c8global.${fabricName()}`
        const stream = `c8globals.${streamName}`

        ws = new WebSocket(
            `wss://${urlWithoutProtocol}/_ws/ws/v2/producer/persistent/${tenant}/${fabric}/${stream}?otp=${wsConnectionOtp}`,
        )

        ws.onclose = () => console.log(`Producer connection closed for stream: ${streamName}`)
        ws.onerror = (e) => console.error(e)
        return ws
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createStreamReader = async (streamName) => {
    try {
        let ws
        const wsConnectionOtp = await getWsConnectionOtp()
        const urlWithoutProtocol = gdnUrl().replace("https://", "")
        const tenant = getTenantId()
        const fabric = `c8global.${fabricName()}`
        const stream = `c8globals.${streamName}`

        ws = new WebSocket(
            `wss://${urlWithoutProtocol}/_ws/ws/v2/reader/persistent/${tenant}/${fabric}/${stream}?messageId=latest&otp=${wsConnectionOtp}`,
        )
        ws.onopen = () => console.log(`Reader connection opened for stream: ${streamName}`)
        ws.onclose = () => console.log(`Reader connection closed for stream: ${streamName}`)
        ws.onerror = (e) => console.error(e)
        return ws
    } catch (error) {
        console.error(error)
        throw error
    }
}
