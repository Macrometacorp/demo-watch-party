import { seriesActionTypes } from "./series.types"

const initialState = {
    loading: false,
    error: "",
    data: [],
}

const sciFiFantasyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case seriesActionTypes.FETCH_SCIFIFANTASY_SERIES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case seriesActionTypes.FETCH_SCIFIFANTASY_SERIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: "",
            }
        case seriesActionTypes.LOAD_MORE_SCIFIFANTASY_SERIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: "",
            }
        case seriesActionTypes.FETCH_SCIFIFANTASY_SERIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload,
            }
        default:
            return state
    }
}

export default sciFiFantasyReducer
