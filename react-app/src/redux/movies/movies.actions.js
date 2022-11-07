import axios from "../../axiosInstance"
import { moviesActionTypes } from "./movies.types"

// Action
export const fetchActionMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST,
})

export const fetchActionMoviesSuccess = (actionMovies, isPage) => ({
    type: isPage ? moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS : moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS,
    payload: actionMovies,
})

export const fetchActionMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE,
    payload: error,
})

export const fetchActionMoviesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchActionMoviesRequest())

        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "28", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const result = res.data.sort(() => Math.random() - 0.5)
                const actionMovies = result.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage && result.length) {
                    dispatch(fetchActionMoviesSuccess(actionMovies, isPage))
                } else dispatch(fetchActionMoviesSuccess(actionMovies, false))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchActionMoviesFailure(errorMessage))
            })
    }
}

// Adventure
export const fetchAdventureMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_REQUEST,
})

export const fetchAdventureMoviesSuccess = (adventureMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_ADVENTURE_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ADVENTURE_MOVIES_SUCCESS,
    payload: adventureMovies,
})

export const fetchAdventureMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_FAILURE,
    payload: error,
})

export const fetchAdventureMoviesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchAdventureMoviesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "12", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const result = res.data.sort(() => Math.random() - 0.5)
                const adventureMovies = result.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchAdventureMoviesSuccess(adventureMovies, isPage))
                } else dispatch(fetchAdventureMoviesSuccess(adventureMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchAdventureMoviesFailure(errorMessage))
            })
    }
}

// SplashAnimation
export const fetchAnimationMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_ANIMATION_MOVIES_REQUEST,
})

export const fetchAnimationMoviesSuccess = (animationMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_ANIMATION_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ANIMATION_MOVIES_SUCCESS,
    payload: animationMovies,
})

export const fetchAnimationMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_ANIMATION_MOVIES_FAILURE,
    payload: error,
})

export const fetchAnimationMoviesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchAnimationMoviesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "16", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const result = res.data.sort(() => Math.random() - 0.5)
                const animationMovies = result.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchAnimationMoviesSuccess(animationMovies, isPage))
                } else dispatch(fetchAnimationMoviesSuccess(animationMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchAnimationMoviesFailure(errorMessage))
            })
    }
}

// Comedy
export const fetchComedyMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_COMEDY_MOVIES_REQUEST,
})

export const fetchComedyMoviesSuccess = (comedyMovies, isPage) => ({
    type: isPage ? moviesActionTypes.FETCH_COMEDY_MOVIES_SUCCESS : moviesActionTypes.LOAD_MORE_COMEDY_MOVIES_SUCCESS,
    payload: comedyMovies,
})

export const fetchComedyMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_COMEDY_MOVIES_FAILURE,
    payload: error,
})

export const fetchComedyMoviesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchComedyMoviesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "35", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const result = res.data.sort(() => Math.random() - 0.5)
                const comedyMovies = result.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchComedyMoviesSuccess(comedyMovies, isPage))
                } else dispatch(fetchComedyMoviesSuccess(comedyMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchComedyMoviesFailure(errorMessage))
            })
    }
}

// Horror
export const fetchHorrorMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_HORROR_MOVIES_REQUEST,
})

export const fetchHorrorMoviesSuccess = (horrorMovies, isPage) => ({
    type: isPage ? moviesActionTypes.FETCH_HORROR_MOVIES_SUCCESS : moviesActionTypes.LOAD_MORE_HORROR_MOVIES_SUCCESS,
    payload: horrorMovies,
})

export const fetchHorrorMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_HORROR_MOVIES_FAILURE,
    payload: error,
})

export const fetchHorrorMoviesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchHorrorMoviesRequest())
        axios
            .post(`${restql}?bindVars=${encodeURI(JSON.stringify({ genreId: "27", offset: offset, resLimit: limit }))}`)
            .then((res) => {
                const result = res.data.sort(() => Math.random() - 0.5)
                const horrorMovies = result.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchHorrorMoviesSuccess(horrorMovies, isPage))
                } else dispatch(fetchHorrorMoviesSuccess(horrorMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchHorrorMoviesFailure(errorMessage))
            })
    }
}

// Netflix
export const fetchNetflixMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_NETFLIX_MOVIES_REQUEST,
})

export const fetchNetflixMoviesSuccess = (netflixMovies, isPage) => ({
    type: isPage ? moviesActionTypes.FETCH_NETFLIX_MOVIES_SUCCESS : moviesActionTypes.LOAD_MORE_NETFLIX_MOVIES_SUCCESS,
    payload: netflixMovies,
})

export const fetchNetflixMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_NETFLIX_MOVIES_FAILURE,
    payload: error,
})

export const fetchNetflixMoviesAsync = (restql, isPage) => {
    return (dispatch) => {
        dispatch(fetchNetflixMoviesRequest())
        axios
            .post(restql)
            .then((res) => {
                const result = res.data.sort(() => Math.random() - 0.5)
                const netflixMovies = result.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchNetflixMoviesSuccess(netflixMovies, isPage))
                } else dispatch(fetchNetflixMoviesSuccess(netflixMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchNetflixMoviesFailure(errorMessage))
            })
    }
}

// Romance
export const fetchRomanceMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_ROMANCE_MOVIES_REQUEST,
})

export const fetchRomanceMoviesSuccess = (romanceMovies, isPage) => ({
    type: isPage ? moviesActionTypes.FETCH_ROMANCE_MOVIES_SUCCESS : moviesActionTypes.LOAD_MORE_ROMANCE_MOVIES_SUCCESS,
    payload: romanceMovies,
})

export const fetchRomanceMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_ROMANCE_MOVIES_FAILURE,
    payload: error,
})

export const fetchRomanceMoviesAsync = (restql, isPage, offset, limit) => {
    return (dispatch) => {
        dispatch(fetchRomanceMoviesRequest())
        axios
            .post(
                `${restql}?bindVars=${encodeURI(
                    JSON.stringify({ genreId: "10749", offset: offset, resLimit: limit }),
                )}`,
            )
            .then((res) => {
                const result = res.data.sort(() => Math.random() - 0.5)
                const romanceMovies = result.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchRomanceMoviesSuccess(romanceMovies, isPage))
                } else dispatch(fetchRomanceMoviesSuccess(romanceMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchRomanceMoviesFailure(errorMessage))
            })
    }
}

// Top Rated
export const fetchTopRatedMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_TOP_RATED_MOVIES_REQUEST,
})

export const fetchTopRatedMoviesSuccess = (topRatedMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_TOP_RATED_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_TOP_RATED_MOVIES_SUCCESS,
    payload: topRatedMovies,
})

export const fetchTopRatedMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_TOP_RATED_MOVIES_FAILURE,
    payload: error,
})

export const fetchTopRatedMoviesAsync = (restql, isPage) => {
    return (dispatch) => {
        dispatch(fetchTopRatedMoviesRequest())

        axios
            .post(restql)
            .then((res) => {
                const topRatedMovies = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchTopRatedMoviesSuccess(topRatedMovies, isPage))
                } else dispatch(fetchTopRatedMoviesSuccess(topRatedMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchTopRatedMoviesFailure(errorMessage))
            })
    }
}

// Trending
export const fetchTrendingMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_TRENDING_MOVIES_REQUEST,
})

export const fetchTrendingMoviesSuccess = (trendingMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_TRENDING_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_TRENDING_MOVIES_SUCCESS,
    payload: trendingMovies,
})

export const fetchTrendingMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_TRENDING_MOVIES_FAILURE,
    payload: error,
})

export const fetchTrendingMoviesAsync = (restql, isPage) => {
    return (dispatch) => {
        dispatch(fetchTrendingMoviesRequest())
        axios
            .post(restql)
            .then((res) => {
                const trendingMovies = res.data.map((el) => ({
                    ...el,
                    isFavourite: false,
                }))
                if (isPage) {
                    dispatch(fetchTrendingMoviesSuccess(trendingMovies, isPage))
                } else dispatch(fetchTrendingMoviesSuccess(trendingMovies))
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchTrendingMoviesFailure(errorMessage))
            })
    }
}

// Upcoming
export const fetchUpcomingMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_UPCOMING_MOVIES_REQUEST,
})

export const fetchUpcomingMoviesSuccess = (upcomingMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_UPCOMING_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_UPCOMING_MOVIES_SUCCESS,
    payload: upcomingMovies,
})

export const fetchUpcomingTrendingMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_UPCOMING_MOVIES_FAILURE,
    payload: error,
})

// Latest
export const fetchLatestMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_LATEST_MOVIES_REQUEST,
})

export const fetchLatestMoviesSuccess = (latestMovies, isPage) => ({
    type: isPage ? moviesActionTypes.FETCH_LATEST_MOVIES_SUCCESS : moviesActionTypes.LOAD_MORE_LATEST_MOVIES_SUCCESS,
    payload: latestMovies,
})

export const fetchLatestTrendingMoviesFailure = (error) => ({
    type: moviesActionTypes.FETCH_LATEST_MOVIES_FAILURE,
    payload: error,
})
