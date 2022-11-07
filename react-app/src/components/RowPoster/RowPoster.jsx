import "./rowPoster.scss"
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests"
import { useDispatch } from "react-redux"
import { FaPlay, FaChevronDown, FaUsers } from "react-icons/fa"
import useGenreConversion from "../../hooks/useGenreConversion"
import { showModalDetail } from "../../redux/modal/modal.actions"
import { useHistory } from "react-router-dom"
import { generateWatchPartyId } from "../../utils"
import { addDocument } from "../../services/documents"
import { createStream } from "../../services/streams"
import Loader from "../Loader/Loader"
import { useState } from "react"

const RowPoster = (result) => {
    const {
        item,
        item: {
            id,
            title,
            original_name,
            original_title,
            name,
            genre_ids,
            poster_path,
            backdrop_path,
            video_path,
            video_type,
        },
        isLarge,
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
        <div className={`Row__poster ${isLarge && "Row__poster--big"}`} onClick={handleModalOpening}>
            {isLarge ? (
                poster_path ? (
                    <img loading="lazy" src={`${BASE_IMG_URL}/${poster_path}`} alt={fallbackTitle} />
                ) : (
                    ""
                )
            ) : backdrop_path ? (
                <img loading="lazy" src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
            ) : (
                <>
                    <img loading="lazy" src={FALLBACK_IMG_URL} alt={fallbackTitle} />
                    <div className="Row__poster__fallback">
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="Row__poster-info">
                <div className="Row__poster-info--iconswrp">
                    <button className="Row__poster-info--icon icon--play" onClick={handlePlayButtonClick}>
                        <FaPlay />
                    </button>
                    <button className="Row__poster-info--icon icon--play" onClick={handleStartWatchParty}>
                        {!startingWachParty ? <FaUsers /> : <Loader loaderSize={12} />}
                    </button>
                    <button className="Row__poster-info--icon icon--toggleModal">
                        <FaChevronDown onClick={handleModalOpening} />
                    </button>
                </div>
                <div className="Row__poster-info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                <div className="Row__poster-info--genres">
                    {genresConverted &&
                        genresConverted.map((genre) => (
                            <span key={`Genre--id_${genre}`} className="genre-title">
                                {genre}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default RowPoster
