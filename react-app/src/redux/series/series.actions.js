import axios from "../../axiosInstance"
import { seriesActionTypes } from "./series.types"

// Netflix
export const fetchNetflixSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_NETFLIX_SERIES_REQUEST,
})

export const fetchNetflixSeriesSuccess = (netflixSeries, isPage) => ({
    type: isPage ? seriesActionTypes.FETCH_NETFLIX_SERIES_SUCCESS : seriesActionTypes.LOAD_MORE_NETFLIX_SERIES_SUCCESS,
    payload: netflixSeries,
})

export const fetchNetflixSeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_NETFLIX_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchNetflixSeriesAsync = (restql, isPage) => {
    return (dispatch) => {
        dispatch(fetchNetflixSeriesRequest())
        axios
            .post(restql)
            .then((res) => {
                const netflixSeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchNetflixSeriesSuccess(netflixSeries, isPage))
                } else dispatch(fetchNetflixSeriesSuccess(netflixSeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchNetflixSeriesFailure(errorMessage))
            })
    }
}

// Action & Adventure
export const fetchActionAdventureSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_ACTIONADVENTURE_SERIES_REQUEST,
})

export const fetchActionAdventureSeriesSuccess = (actionAdventureSeries, isPage) => ({
    type: isPage
        ? seriesActionTypes.FETCH_ACTIONADVENTURE_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_ACTIONADVENTURE_SERIES_SUCCESS,
    payload: actionAdventureSeries,
})

export const fetchActionAdventureSeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_ACTIONADVENTURE_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchActionAdventureSeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchActionAdventureSeriesRequest())
        axios
            .post(
                `${restql}?bindVars=${encodeURI(
                    JSON.stringify({ genreId: "10759", offset: offset, resLimit: limit }),
                )}`,
            )
            .then((res) => {
                const actionAdventureSeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchActionAdventureSeriesSuccess(actionAdventureSeries, isPage))
                } else dispatch(fetchActionAdventureSeriesSuccess(actionAdventureSeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchActionAdventureSeriesFailure(errorMessage))
            })
    }
}

// SplashAnimation
export const fetchAnimationSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_ANIMATION_SERIES_REQUEST,
})

export const fetchAnimationSeriesSuccess = (animationSeries, isPage) => ({
    type: isPage
        ? seriesActionTypes.FETCH_ANIMATION_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_ANIMATION_SERIES_SUCCESS,
    payload: animationSeries,
})

export const fetchAnimationSeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_ANIMATION_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchAnimationSeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchAnimationSeriesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "16", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const animationSeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchAnimationSeriesSuccess(animationSeries, isPage))
                } else dispatch(fetchAnimationSeriesSuccess(animationSeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchAnimationSeriesFailure(errorMessage))
            })
    }
}

// Comedy
export const fetchComedySeriesRequest = () => ({
    type: seriesActionTypes.FETCH_COMEDY_SERIES_REQUEST,
})

export const fetchComedySeriesSuccess = (comedySeries, isPage) => ({
    type: isPage ? seriesActionTypes.FETCH_COMEDY_SERIES_SUCCESS : seriesActionTypes.LOAD_MORE_COMEDY_SERIES_SUCCESS,
    payload: comedySeries,
})

export const fetchComedySeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_COMEDY_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchComedySeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchComedySeriesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "35", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const comedySeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchComedySeriesSuccess(comedySeries, isPage))
                } else dispatch(fetchComedySeriesSuccess(comedySeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchComedySeriesFailure(errorMessage))
            })
    }
}

// Crime
export const fetchCrimeSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_CRIME_SERIES_REQUEST,
})

export const fetchCrimeSeriesSuccess = (crimeSeries, isPage) => ({
    type: isPage ? seriesActionTypes.FETCH_CRIME_SERIES_SUCCESS : seriesActionTypes.LOAD_MORE_CRIME_SERIES_SUCCESS,
    payload: crimeSeries,
})

export const fetchCrimeSeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_CRIME_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchCrimeSeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchCrimeSeriesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "80", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const crimeSeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchCrimeSeriesSuccess(crimeSeries, isPage))
                } else dispatch(fetchCrimeSeriesSuccess(crimeSeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchCrimeSeriesFailure(errorMessage))
            })
    }
}

// Documentary
export const fetchDocumentarySeriesRequest = () => ({
    type: seriesActionTypes.FETCH_DOCUMENTARY_SERIES_REQUEST,
})

export const fetchDocumentarySeriesSuccess = (documentarySeries, isPage) => ({
    type: isPage
        ? seriesActionTypes.FETCH_DOCUMENTARY_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_DOCUMENTARY_SERIES_SUCCESS,
    payload: documentarySeries,
})

export const fetchDocumentarySeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_DOCUMENTARY_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchDocumentarySeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchDocumentarySeriesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "99", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const documentarySeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchDocumentarySeriesSuccess(documentarySeries, isPage))
                } else dispatch(fetchDocumentarySeriesSuccess(documentarySeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchDocumentarySeriesFailure(errorMessage))
            })
    }
}

// Family
export const fetchFamilySeriesRequest = () => ({
    type: seriesActionTypes.FETCH_FAMILY_SERIES_REQUEST,
})

export const fetchFamilySeriesSuccess = (familySeries, isPage) => ({
    type: isPage ? seriesActionTypes.FETCH_FAMILY_SERIES_SUCCESS : seriesActionTypes.LOAD_MORE_FAMILY_SERIES_SUCCESS,
    payload: familySeries,
})

export const fetchFamilySeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_FAMILY_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchFamilySeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchFamilySeriesRequest())
        axios
            .post(
                `${restql}?bindVars=${encodeURI(
                    JSON.stringify({ genreId: "10751", offset: offset, resLimit: limit }),
                )}`,
            )
            .then((res) => {
                const familySeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchFamilySeriesSuccess(familySeries, isPage))
                } else dispatch(fetchFamilySeriesSuccess(familySeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchFamilySeriesFailure(errorMessage))
            })
    }
}

// Kids
export const fetchKidsSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_KIDS_SERIES_REQUEST,
})

export const fetchKidsSeriesSuccess = (kidsSeries, isPage) => ({
    type: isPage ? seriesActionTypes.FETCH_KIDS_SERIES_SUCCESS : seriesActionTypes.LOAD_MORE_KIDS_SERIES_SUCCESS,
    payload: kidsSeries,
})

export const fetchKidsSeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_KIDS_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchKidsSeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchKidsSeriesRequest())
        axios
            .post(
                `${restql}?bindVars=${encodeURI(
                    JSON.stringify({ genreId: "10762", offset: offset, resLimit: limit }),
                )}`,
            )
            .then((res) => {
                const kidsSeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchKidsSeriesSuccess(kidsSeries, isPage))
                } else dispatch(fetchKidsSeriesSuccess(kidsSeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchKidsSeriesFailure(errorMessage))
            })
    }
}

// Sci Fi & Fantasy
export const fetchSciFiFantasySeriesRequest = () => ({
    type: seriesActionTypes.FETCH_SCIFIFANTASY_SERIES_REQUEST,
})

export const fetchSciFiFantasySeriesSuccess = (sciFiFantasySeries, isPage) => ({
    type: isPage
        ? seriesActionTypes.FETCH_SCIFIFANTASY_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_SCIFIFANTASY_SERIES_SUCCESS,
    payload: sciFiFantasySeries,
})

export const fetchSciFiFantasySeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_SCIFIFANTASY_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchSciFiFantasySeriesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchSciFiFantasySeriesRequest())
        axios
            .post(
                `${restql}?bindVars=${encodeURI(
                    JSON.stringify({ genreId: "10765", offset: offset, resLimit: limit }),
                )}`,
            )
            .then((res) => {
                const sciFiFantasySeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchSciFiFantasySeriesSuccess(sciFiFantasySeries, isPage))
                } else dispatch(fetchSciFiFantasySeriesSuccess(sciFiFantasySeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchSciFiFantasySeriesFailure(errorMessage))
            })
    }
}

// Trending
export const fetchTrendingSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_TRENDING_SERIES_REQUEST,
})

export const fetchTrendingSeriesSuccess = (trendingSeries, isPage) => ({
    type: isPage
        ? seriesActionTypes.FETCH_TRENDING_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_TRENDING_SERIES_SUCCESS,
    payload: trendingSeries,
})

export const fetchTrendingSeriesFailure = (errorMessage) => ({
    type: seriesActionTypes.FETCH_TRENDING_SERIES_FAILURE,
    payload: errorMessage,
})

export const fetchTrendingSeriesAsync = (restql, isPage) => {
    return (dispatch) => {
        dispatch(fetchTrendingSeriesRequest())
        axios
            .post(restql)
            .then((res) => {
                const trendingSeries = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchTrendingSeriesSuccess(trendingSeries, isPage))
                } else dispatch(fetchTrendingSeriesSuccess(trendingSeries))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchTrendingSeriesFailure(errorMessage))
            })
    }
}
