import "./banner.scss"
import React, { useState } from "react"
import { motion } from "framer-motion"
import {
    staggerOne,
    bannerFadeInLoadSectionVariants,
    bannerFadeInVariants,
    bannerFadeInUpVariants,
} from "../../motionUtils"
import { BASE_IMG_URL } from "../../requests"
import { FaPlay, FaUsers } from "react-icons/fa"
import { BiInfoCircle } from "react-icons/bi"
import { generateWatchPartyId, randomize, truncate } from "../../utils"
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner"
import { useDispatch, useSelector } from "react-redux"
import { showModalDetail } from "../../redux/modal/modal.actions"
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors"
import { selectNetflixSeries } from "../../redux/series/series.selectors"
import { useHistory } from "react-router-dom"
import { addDocument } from "../../services/documents"
import { createStream } from "../../services/streams"
import Loader from "../Loader/Loader"

const Banner = ({ type }) => {
    let selector
    switch (type) {
        case "movies":
            selector = selectTrendingMovies
            break
        case "series":
            selector = selectNetflixSeries
            break
        default:
            selector = selectNetflixMovies
            break
    }

    const dispatch = useDispatch()
    const history = useHistory()
    const myData = useSelector(selector)
    const { loading, error, data: results } = myData
    const finalData = results[randomize(results)]
    const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name
    const description = truncate(finalData?.overview, 150)

    const [startingWachParty, setStartingWachParty] = useState(false)

    const handlePlayButtonClick = (event) => {
        event.stopPropagation()

        history.push({
            pathname: "/play",
            state: {
                source: finalData?.video_path,
                type: finalData?.video_type,
                posterUrl: `${BASE_IMG_URL}/${finalData?.backdrop_path}` || "",
            },
        })
    }

    const handleStartWatchParty = async (event) => {
        event.stopPropagation()
        setStartingWachParty(true)

        try {
            const watchPartyId = generateWatchPartyId()
            await addDocument("watch_party", [{ _key: watchPartyId, video_id: finalData.id }])
            await createStream(watchPartyId)

            setStartingWachParty(false)
            history.push(`/together/${watchPartyId}`)
        } catch (error) {
            setStartingWachParty(false)
        }
    }

    const handleModalOpening = () => {
        dispatch(showModalDetail({ ...finalData, fallbackTitle }))
    }

    return (
        <>
            <motion.section
                variants={bannerFadeInLoadSectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="Banner__loadsection"
            >
                {loading && <SkeletonBanner />}
                {error && <div className="errored">Oops, an error occurred.</div>}
            </motion.section>

            {!loading && finalData && (
                <motion.header
                    variants={bannerFadeInVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="Banner"
                    style={{
                        backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`,
                    }}
                >
                    <motion.div
                        className="Banner__content"
                        variants={staggerOne}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">
                            {fallbackTitle}
                        </motion.h1>
                        <motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
                            <motion.button className="Banner__button" onClick={handlePlayButtonClick}>
                                <FaPlay />
                                <span>Play</span>
                            </motion.button>
                            <motion.button
                                className="Banner__button"
                                onClick={handleStartWatchParty}
                                disabled={startingWachParty}
                            >
                                <FaUsers />
                                <span>{!startingWachParty ? "Start Watch Party" : <Loader loaderSize={12} />}</span>
                            </motion.button>
                            <button className="Banner__button" onClick={handleModalOpening}>
                                <BiInfoCircle size="1.5em" onClick={handleModalOpening} />
                            </button>
                        </motion.div>
                        <motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">
                            {description}
                        </motion.p>
                    </motion.div>
                    <div className="Banner__panel" />
                    <div className="Banner__bottom-shadow" />
                </motion.header>
            )}
        </>
    )
}

export default React.memo(Banner)
