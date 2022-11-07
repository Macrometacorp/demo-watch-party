import { useEffect, useRef, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import "./videoPlayer.scss"

const VideoPlayer = (props) => {
    const videoEndpoint = process.env.REACT_APP_VIDEO_ENDPOINT
    const playerOptions = {
        autoplay: true,
        controls: true,
        responsive: false,
        fill: true,
        bigPlayButton: true,
        controlBar: {
            pictureInPictureToggle: false,
            volumePanel: { inline: false },
        },
    }

    const history = useHistory()
    const { state } = useLocation()
    const videoRef = useRef(null)
    const playerRef = useRef(null)

    const [source, setSource] = useState(null)
    const [type, setType] = useState(null)
    const [posterUrl, setPosterUrl] = useState(null)
    const [startTime, setStartTime] = useState(0)
    const [isWatchParty, setIsWatchParty] = useState(false)

    const handlePlayerClose = (event) => {
        event.stopPropagation()
        history.push("/")
    }

    useEffect(() => {
        if (state && state.source && state.type) {
            setPosterUrl(state.posterUrl || "")
            setStartTime(state.startTime || startTime)
            setType(state.type)
            setSource(state.source)
        }
    }, [state])

    useEffect(() => {
        if (props && props.source && props.type) {
            setPosterUrl(props.posterUrl || "")
            setStartTime(props.startTime || startTime)
            setType(props.type)
            setSource(props.source)
            setIsWatchParty(props.isWatchParty)
        }
    }, [props])

    useEffect(() => {
        let player = playerRef.current
        if (!playerRef.current) {
            const videoElement = videoRef.current
            if (!videoElement) return

            playerRef.current = videojs(videoElement, playerOptions)
            player = playerRef.current

            const PlayerButton = videojs.getComponent("CloseButton")
            let closeButton = new PlayerButton(player)
            closeButton.handleClick = handlePlayerClose
            player.addChild(closeButton, {}, 0)
        }
    }, [videoRef])

    useEffect(() => {
        if (source === "" || type == "") {
            history.push("/")
        }

        if (source && type) {
            let player = playerRef.current
            if (posterUrl) {
                player.poster(posterUrl)
            }

            if (isWatchParty) {
                player.currentTime(startTime)
                player.on("playing", () => props.onPlay(playerRef.current))
                player.on("pause", () => props.onPause(playerRef.current))
                player.on("timeupdate", () => props.onTimeUpdate(playerRef.current))
                player.on("ended", () => props.onEnd())
            }
            player.src({
                src: `${videoEndpoint}${source}`,
                type: type,
            })

            player.play().catch(() => {
                player.muted(true)
                player.play()
            })
        }
    }, [source, type])

    useEffect(() => {
        const player = playerRef.current

        return () => {
            if (player) {
                player.dispose()
                playerRef.current = null
            }
        }
    }, [playerRef])

    return (
        <div
            data-vjs-player
            className="VideoPlayer__container"
            style={{ "--videoWidth": isWatchParty ? "70vw" : "100vw" }}
        >
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    )
}

export default VideoPlayer
