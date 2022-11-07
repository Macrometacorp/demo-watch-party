import gdnAxiosInstance, { fabricName } from "./gdn"

export const addDocument = async (collectionName, document) => {
    try {
        await gdnAxiosInstance.post(`/_fabric/${fabricName()}/_api/document/${collectionName}`, document)
    } catch (error) {
        console.error(error)
        throw error
    }
}
