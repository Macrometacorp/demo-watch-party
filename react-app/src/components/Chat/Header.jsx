import { Divider, Flex, Heading } from "@chakra-ui/react"
import { BsChatDots } from "react-icons/bs"

const Header = ({ title }) => {
    return (
        <>
            <Flex h={"4em"} align={"center"} justify={"center"}>
                <Heading size={"md"} mr={2}>
                    {title}
                </Heading>
                <BsChatDots size={"1.5em"} />
            </Flex>
            <Divider mt={0} mb={2} />
        </>
    )
}

export default Header
