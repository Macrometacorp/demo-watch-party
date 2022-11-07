import { Box, Text } from "@chakra-ui/react"

const ChatBubble = ({ isMine, username, message }) => {
    const bgColor = { light: "gray.300", dark: "gray.600" }
    const textColor = { light: "black", dark: "white" }

    return (
        <Box
            bg={isMine ? "blue.500" : bgColor["light"]}
            w="fit-content"
            py={1}
            px={3}
            rounded="xl"
            margin={2}
            ml={isMine ? "auto" : "2"}
            position="relative"
            textAlign={isMine ? "right" : "left"}
            wordBreak="break-word"
            color={isMine ? "white" : textColor["light"]}
        >
            <Text fontSize="xs" color={isMine ? "white" : textColor["light"]}>
                {username}
            </Text>
            <Text>{message}</Text>
        </Box>
    )
}

export default ChatBubble
