import { useState } from "react"
import { Button, Input, Flex, FormControl } from "@chakra-ui/react"

const MessageBar = ({ setUsername, sendMessage }) => {
    const [text, setText] = useState("")
    const [isUsernameSet, setIsUsernameSet] = useState(false)

    const handleChange = (event) => {
        setText(event.target.value)
    }

    const onSelectUsername = (event) => {
        event.preventDefault()

        setUsername(text)
        setIsUsernameSet(true)
        setText("")
    }

    const onSend = (event) => {
        event.preventDefault()

        if (text && text.trim()) {
            sendMessage({
                type: "user",
                event: "chat",
                text,
            })
            setText("")
        }
    }

    return (
        <Flex direction="row" position="sticky" bottom={0}>
            <FormControl
                p={2}
                pb={8}
                zIndex={3}
                as="form"
                display="flex"
                alignItems="center"
                onClick={(event) => event.preventDefault()}
            >
                <Input
                    size="md"
                    value={text}
                    onChange={handleChange}
                    placeholder={isUsernameSet ? "Start a conversation" : "Select Username"}
                />
                <Button
                    ml={1}
                    size="md"
                    w={"auto"}
                    type="submit"
                    bg={"#6767e6"}
                    onClick={isUsernameSet ? onSend : onSelectUsername}
                    color={"white"}
                >
                    {isUsernameSet ? "Send" : "Join"}
                </Button>
            </FormControl>
        </Flex>
    )
}

export default MessageBar
