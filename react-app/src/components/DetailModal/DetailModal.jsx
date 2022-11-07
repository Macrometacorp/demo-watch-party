import "./detailModal.scss"
import { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { staggerOne, modalOverlayVariants, modalVariants, modalFadeInUpVariants } from "../../motionUtils"
import { hideModalDetail } from "../../redux/modal/modal.actions"
import { useDispatch, useSelector } from "react-redux"
import { selectModalContent, selectModalState } from "../../redux/modal/modal.selectors"
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests"
import { VscChromeClose } from "react-icons/vsc"
import { capitalizeFirstLetter, dateToYearOnly, generateWatchPartyId } from "../../utils"
import { FaPlay, FaUsers } from "react-icons/fa"
import useOutsideClick from "../../hooks/useOutsideClick"
import { addDocument } from "../../services/documents"
import { createStream } from "../../services/streams"
import Loader from "../Loader/Loader"

const DetailModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const modalClosed = useSelector(selectModalState)
    const modalContent = useSelector(selectModalContent)
    const handleModalClose = () => dispatch(hideModalDetail())
    const {
        id,
        overview,
        fallbackTitle,
        backdrop_path,
        release_date,
        first_air_date,
        vote_average,
        original_language,
        adult,
        genresConverted,
        video_path,
        video_type,
    } = modalContent
    const joinedGenres = genresConverted ? genresConverted.join(", ") : "Not available"
    const maturityRating =
        adult === undefined ? "Not available" : adult ? "Suitable for adults only" : "Suitable for all ages"
    const reducedDate = release_date
        ? dateToYearOnly(release_date)
        : first_air_date
        ? dateToYearOnly(first_air_date)
        : "Not Available"
    const modalRef = useRef()
    const [startingWachParty, setStartingWachParty] = useState(false)

    const handleStartWatchParty = async (event) => {
        event.stopPropagation()
        setStartingWachParty(true)

        try {
            const watchPartyId = generateWatchPartyId()
            await addDocument("watch_party", [{ _key: watchPartyId, video_id: id }])
            await createStream(watchPartyId)

            setStartingWachParty(false)
            handleModalClose()
            history.push(`/together/${watchPartyId}`)
        } catch (error) {
            setStartingWachParty(false)
        }
    }

    const handlePlayButton = (event) => {
        event.stopPropagation()
        handleModalClose()

        history.push({
            pathname: "/play",
            state: {
                source: video_path,
                type: video_type,
                posterUrl: `${BASE_IMG_URL}/${backdrop_path}` || "",
            },
        })
    }

    useOutsideClick(modalRef, () => {
        if (!modalClosed) handleModalClose()
    })

    return (
        <AnimatePresence exitBeforeEnter>
            {!modalClosed && (
                <>
                    <motion.div
                        variants={modalOverlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        key="modalOverlay"
                        className={`Modal__overlay ${modalClosed && "Modal__invisible"}`}
                    >
                        <motion.div
                            key="modal"
                            variants={modalVariants}
                            ref={modalRef}
                            className={`Modal__wrp ${modalClosed && "Modal__invisible"}`}
                        >
                            <motion.button className="Modal__closebtn" onClick={handleModalClose}>
                                <VscChromeClose />
                            </motion.button>
                            <div className="Modal__image--wrp">
                                <div className="Modal__image--shadow" />
                                <img
                                    className="Modal__image--img"
                                    src={backdrop_path ? `${BASE_IMG_URL}/${backdrop_path}` : FALLBACK_IMG_URL}
                                    alt={fallbackTitle}
                                />
                                <div className="Modal__image--buttonswrp">
                                    <motion.button className="Modal__image--button" onClick={handlePlayButton}>
                                        <FaPlay />
                                        <span>Play</span>
                                    </motion.button>
                                    <motion.button
                                        className="Modal__image--button Modal__image--watch-party-button"
                                        onClick={handleStartWatchParty}
                                        disabled={startingWachParty}
                                    >
                                        <FaUsers />
                                        <span>
                                            {!startingWachParty ? "Start Watch Party" : <Loader loaderSize={12} />}
                                        </span>
                                    </motion.button>
                                </div>
                            </div>
                            <motion.div
                                variants={staggerOne}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="Modal__info--wrp"
                            >
                                <motion.h3 variants={modalFadeInUpVariants} className="Modal__info--title">
                                    {fallbackTitle}
                                </motion.h3>
                                <motion.p variants={modalFadeInUpVariants} className="Modal__info--description">
                                    {overview}
                                </motion.p>
                                <motion.hr variants={modalFadeInUpVariants} className="Modal__info--line" />
                                <motion.h4 variants={modalFadeInUpVariants} className="Modal__info--otherTitle">
                                    Info on <b>{fallbackTitle}</b>
                                </motion.h4>
                                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                                    <span className="Modal__info--row-label">Genres: </span>
                                    <span className="Modal__info--row-description">{joinedGenres}</span>
                                </motion.div>
                                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                                    <span className="Modal__info--row-label">
                                        {release_date ? "Release date: " : "First air date: "}
                                    </span>
                                    <span className="Modal__info--row-description">{reducedDate}</span>
                                </motion.div>
                                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                                    <span className="Modal__info--row-label">Average vote: </span>
                                    <span className="Modal__info--row-description">
                                        {vote_average || "Not available"}
                                    </span>
                                </motion.div>
                                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                                    <span className="Modal__info--row-label">Original language: </span>
                                    <span className="Modal__info--row-description">
                                        {capitalizeFirstLetter(original_language)}
                                    </span>
                                </motion.div>
                                <motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
                                    <span className="Modal__info--row-label">Age classification: </span>
                                    <span className="Modal__info--row-description">{maturityRating}</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default DetailModal
