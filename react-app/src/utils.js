import { uniqueNamesGenerator, adjectives, animals, colors, names } from "unique-names-generator"

const nameGeneratorConfig = { dictionaries: [adjectives, animals, colors], separator: "-", length: 3 }

export const dateToYearOnly = (date) => date.slice(0, 4)

export const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1)

export const randomize = (data) => Math.floor(Math.random() * data.length - 1)

export const truncate = (text, n) => (text?.length > n ? text.substr(0, n - 1) + "..." : text)

export const generateWatchPartyId = () => {
    return uniqueNamesGenerator(nameGeneratorConfig)
}

export const generateName = () => {
    return uniqueNamesGenerator({ dictionaries: [names] })
}

export const parseMessage = (msg) => {
    const encodedMessage = JSON.parse(msg).payload
    const messageId = JSON.parse(msg).messageId
    const decodedMessage = atob(encodedMessage)

    if (decodedMessage.length === 0) {
        return { receivedMessage: {}, messageId }
    }
    const receivedMessage = JSON.parse(decodedMessage)
    return { receivedMessage, messageId }
}
