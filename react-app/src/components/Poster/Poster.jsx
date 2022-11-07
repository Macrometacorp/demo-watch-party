import "./poster.scss"
import { motion } from "framer-motion"
import { posterFadeInVariants } from "../../motionUtils"
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests"
import { FaChevronDown, FaPlay, FaUsers } from "react-icons/fa"
import useGenreConversion from "../../hooks/useGenreConversion"
import { showModalDetail } from "../../redux/modal/modal.actions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Loader from "../Loader/Loader"
import { useState } from "react"
import { generateWatchPartyId } from "../../utils"
import { addDocument } from "../../services/documents"
import { createStream } from "../../services/streams"

const Poster = (result) => {
    const {
        item,
        item: { id, title, original_name, original_title, name, genre_ids, backdrop_path, video_path, video_type },
        isFavourite,
    } = result
    let fallbackTitle = title || original_title || name || original_name
    const genresConverted = useGenreConversion(genre_ids)
    const dispatch = useDispatch()
    const history = useHistory()
    const [startingWachParty, setStartingWachParty] = useState(false)

    const handleModalOpening = () => {
        dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }))
    }

    const handlePlayButtonClick = (event) => {
        event.stopPropagation()

        history.push({
            pathname: "/play",
            state: {
                source: video_path,
                type: video_type,
                posterUrl: `${BASE_IMG_URL}/${backdrop_path}` || "",
            },
        })
    }

    const handleStartWatchParty = async (event) => {
        event.stopPropagation()
        setStartingWachParty(true)

        try {
            const watchPartyId = generateWatchPartyId()
            await addDocument("watch_party", [{ _key: watchPartyId, video_id: id }])
            await createStream(watchPartyId)

            setStartingWachParty(false)
            history.push(`/together/${watchPartyId}`)
        } catch (error) {
            setStartingWachParty(false)
            console.error(error)
        }
    }

    return (
        <motion.div variants={posterFadeInVariants} className="Poster" onClick={handleModalOpening}>
            {backdrop_path ? (
                <img loading="lazy" src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
            ) : (
                <>
                    <img loading="lazy" src={FALLBACK_IMG_URL} alt={fallbackTitle} />
                    <div className="Poster__fallback">
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="Poster__info">
                <div className="Poster__info--iconswrp">
                    <motion.button className="Poster__info--icon icon--play" onClick={handlePlayButtonClick}>
                        <FaPlay />
                    </motion.button>
                    <motion.button className="Poster__info--icon icon--play" onClick={handleStartWatchParty}>
                        {!startingWachParty ? <FaUsers /> : <Loader loaderSize={12} />}
                    </motion.button>
                    <button className="Poster__info--icon icon--toggleModal">
                        <FaChevronDown onClick={handleModalOpening} />
                    </button>
                </div>
                <div className="Poster__info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                <div className="Poster__info--genres">
                    {genresConverted &&
                        genresConverted.map((genre, index) => (
                            <span key={`Genre--id_${genre}_${index}`} className="genre-title">
                                {genre}
                            </span>
                        ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Poster
