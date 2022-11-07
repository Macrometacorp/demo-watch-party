import "./chat.scss"
import { useEffect } from "react"
import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import Header from "./Header"
import ChatBubble from "./ChatBubble"
import MessageBar from "./MessageBar"
import { useRef } from "react"

const Chat = ({ username, setUsername, messages, sendMessage }) => {
    const bgColor = useColorModeValue("gray.50", "gray.900")

    const messagesWindow = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            try {
                messagesWindow.current.scrollTop = messagesWindow.current.scrollHeight
                // eslint-disable-next-line no-empty
            } catch (error) {}
        }, 20)
    }, [messages])

    return (
        <Flex className="Chat" direction="column" h="100vh" w="30vw" bg={bgColor}>
            <Header title="Chat" />

            <Box h="100%" overflowY="auto" ref={messagesWindow}>
                {messages.map((message, i) => {
                    return (
                        <ChatBubble
                            key={i}
                            isMine={message.username === username}
                            username={message.username}
                            message={message.text}
                        />
                    )
                })}
            </Box>

            <MessageBar setUsername={setUsername} sendMessage={sendMessage} />
        </Flex>
    )
}

export default Chat
