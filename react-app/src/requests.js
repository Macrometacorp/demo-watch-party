import Fallback_Img from "../src/images/fallback_img.png"
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original"
export const GITHUB_BASE_URL = process.env.REACT_APP_GITHUB_REPO

export const LANG = "en-US"
export const REGION = "US"
export const FALLBACK_IMG_URL = Fallback_Img

export const restql = {
    topRatedMovies: "mm-_system-getTopRatedMovies",
    topRatedTvSeries: "mm-_system-getTopRatedTvSeries",
    movieAssetsByGenre: "mm-_system-getMovieAssetsByGenre",
    tvSeriesAssetsByGenre: "mm-_system-getTvSeriesAssetsByGenre",
    searchByCriteria: "mm-_system-searchByCriteria",
    watchPartyDetails: "mm-_system-getWatchPartyDetails",
}

export default restql
