import "./watchParty.scss"
import { motion } from "framer-motion"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { Button, Tooltip, useClipboard, useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import instance from "../../axiosInstance"
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer"
import Loader from "../../components/Loader/Loader"
import { createStreamProducer, createStreamReader } from "../../services/streams"
import { generateName, parseMessage } from "../../utils"
import Chat from "../../components/Chat/Chat"
import restql from "../../requests"

const WatchParty = () => {
    const defaultToastMessage = "User USER_NAME joined the watch party"

    const toast = useToast()
    const history = useHistory()
    const { watchPartyId } = useParams()
    const { onCopy, hasCopied } = useClipboard(window.location.href)

    const videoPlayerRef = useRef(null)
    const watchPartyStreamProducer = useRef(null)
    const watchPartyStreamReader = useRef(null)
    const wsKeepAlive = useRef(null)

    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState("")
    const [watchPartyDetails, setWatchPartyDetails] = useState({})
    const [videoStartTime, setVideoStartTime] = useState(0)
    const [requestCurrentTime, setRequestCurrentTime] = useState(false)
    const [currentTimeRequestCount, setCurrentTimeRequestCount] = useState(0)

    const onVideoPlay = (playerRef) => {
        videoPlayerRef.current = playerRef

        sendWatchPartyEvent({
            type: "player",
            event: "playing",
            currentTime: Math.ceil(videoPlayerRef.current.currentTime()),
        })
    }

    const onVideoPause = (playerRef) => {
        videoPlayerRef.current = playerRef

        sendWatchPartyEvent({
            type: "player",
            event: "pause",
            currentTime: Math.ceil(videoPlayerRef.current.currentTime()),
        })
    }

    const onVideoEnd = () => {
        sendWatchPartyEvent({
            type: "player",
            event: "ended",
            currentTime: 0,
        })
        history.push("/")
    }

    const onVideoTimeUpdate = (playerRef) => {
        videoPlayerRef.current = playerRef

        if (!wsKeepAlive.current) {
            wsKeepAlive.current = setInterval(() => {
                sendWatchPartyEvent({
                    type: "user",
                    event: "keepAlive",
                    currentTime: Math.ceil(videoPlayerRef.current.currentTime() || 0),
                })
            }, 20000)
        }
    }

    const sendWatchPartyEvent = (message) => {
        if (watchPartyStreamProducer.current?.readyState == 1) {
            const _message = JSON.stringify({ ...message, username })
            const payload = { payload: window.btoa(_message) }
            watchPartyStreamProducer.current.send(JSON.stringify(payload))
        }
    }

    const messageManipulation = useCallback(
        (message) => {
            const { receivedMessage } = parseMessage(message)
            if (!receivedMessage || !Object.keys(receivedMessage).length) {
                return
            }

            if (receivedMessage.username === username && receivedMessage.event !== "chat") {
                return
            }

            if (receivedMessage.type === "player") {
                switch (receivedMessage.event) {
                    case "playing":
                        if (videoPlayerRef.current.paused()) {
                            setVideoStartTime(receivedMessage.currentTime)
                            videoPlayerRef.current.currentTime(receivedMessage.currentTime)
                            videoPlayerRef.current.play()
                        }
                        break
                    case "pause":
                        setVideoStartTime(receivedMessage.currentTime)
                        videoPlayerRef.current.pause()
                        break
                }
            }

            if (receivedMessage.type === "user") {
                switch (receivedMessage.event) {
                    case "requestCurrentTime":
                        sendWatchPartyEvent({
                            type: "user",
                            event: "currentTimeResponse",
                            currentTime: Math.ceil(videoPlayerRef.current.currentTime()),
                        })
                        break
                    case "userJoined":
                        toast({
                            title: `${defaultToastMessage.replace("USER_NAME", receivedMessage.username)}`,
                            position: "top",
                            isClosable: true,
                        })
                        break
                    case "currentTimeResponse":
                        setVideoStartTime(receivedMessage.currentTime)
                        setCurrentTimeRequestCount(10)
                        break
                    case "chat":
                        setMessages((prev) => [...prev, receivedMessage])
                        break
                    default:
                        console.log("Keeping ws connection alive \t", receivedMessage.event)
                        break
                }
            }
        },
        [toast, username],
    )

    const startStreamWsConnections = useCallback(async () => {
        try {
            watchPartyStreamReader.current = await createStreamReader(watchPartyDetails._key)

            watchPartyStreamReader.current.onmessage = (message) => {
                watchPartyStreamReader.current.send(JSON.stringify({ messageId: JSON.parse(message.data).messageId }))
                messageManipulation(message.data, username)
            }

            watchPartyStreamProducer.current = await createStreamProducer(watchPartyDetails._key)

            watchPartyStreamProducer.current.onopen = () => {
                console.log(`Producer connection opened for stream: ${watchPartyDetails._key}`)
                setRequestCurrentTime(!requestCurrentTime)
                sendWatchPartyEvent({
                    type: "user",
                    event: "userJoined",
                    currentTime: null,
                })
            }
        } catch (error) {
            console.error(error)
        }
    }, [watchPartyDetails._key, username, messageManipulation])

    useEffect(() => {
        const getWatchPartyDetails = async (_watchPartyId) => {
            try {
                const { data } = await instance.post(
                    `${restql.watchPartyDetails}?bindVars=${encodeURI(
                        JSON.stringify({ watchPartyId: _watchPartyId }),
                    )}`,
                )

                setWatchPartyDetails(data[0] || "")
            } catch (error) {
                console.error(error)
                setWatchPartyDetails("")
            }
        }

        if (!watchPartyId || !watchPartyId.trim()) {
            history.push("/")
        } else {
            getWatchPartyDetails(watchPartyId)
            setUsername(generateName())
        }

        return () => {
            if (watchPartyStreamReader.current) {
                watchPartyStreamReader.current.close()
            }

            if (watchPartyStreamProducer.current) {
                watchPartyStreamProducer.current.close()
            }

            if (wsKeepAlive.current) {
                clearInterval(wsKeepAlive.current)
            }
        }
    }, [])

    useEffect(() => {
        if (typeof watchPartyDetails !== "object") {
            history.push("/")
        }

        if (watchPartyDetails && watchPartyDetails.title) {
            startStreamWsConnections()
        }
    }, [watchPartyDetails])

    useEffect(() => {
        if (watchPartyStreamProducer.current?.readyState === 1 && currentTimeRequestCount <= 2) {
            sendWatchPartyEvent({
                type: "user",
                event: "requestCurrentTime",
                currentTime: new Date().getTime(),
            })
            setTimeout(() => setCurrentTimeRequestCount((prev) => prev + 1), 400)
        }

        if (currentTimeRequestCount > 2) {
            setVideoStartTime(0)
        }
    }, [requestCurrentTime, currentTimeRequestCount])

    return (
        <motion.div className="WatchParty">
            {watchPartyStreamReader.current && watchPartyStreamProducer.current && currentTimeRequestCount > 2 ? (
                <motion.div className="WatchParty__container">
                    <motion.div className="WatchParty__videoContainer">
                        <motion.div className="WatchParty__videoContainer--buttonContainer">
                            <Button className="WatchParty__videoContainer--copyButton" onClick={onCopy}>
                                {hasCopied ? "Copied Watch Party URL!" : "Copy Watch Party URL"}
                            </Button>
                            <Tooltip
                                fontSize={"lg"}
                                color={"#171923"}
                                bg={"#FFFFFF"}
                                placement="bottom-end"
                                label="Share your Watch Party URL to invite people to watch this video together and chat about it while you do!"
                            >
                                <span className="WatchParty__videoContainer--tooltip">
                                    <AiOutlineInfoCircle />
                                </span>
                            </Tooltip>
                        </motion.div>
                        <VideoPlayer
                            source={watchPartyDetails.video_path}
                            type={watchPartyDetails.video_type}
                            posterUrl={watchPartyDetails.posterUrl}
                            startTime={videoStartTime}
                            onPlay={onVideoPlay}
                            onTimeUpdate={onVideoTimeUpdate}
                            onPause={onVideoPause}
                            onEnd={onVideoEnd}
                            isWatchParty={true}
                        />
                    </motion.div>
                    <Chat
                        username={username}
                        setUsername={setUsername}
                        messages={messages}
                        sendMessage={sendWatchPartyEvent}
                    />
                </motion.div>
            ) : (
                <div className="WatchParty__loader">
                    <Loader loaderSize={48} />
                    <span className="WatchParty__loader--text"> Starting Your Watch Party...</span>
                </div>
            )}
        </motion.div>
    )
}

export default WatchParty
