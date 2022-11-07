import { searchActionTypes } from "./search.types"
import axios from "../../axiosInstance"
import restql from "../../requests"

export const changeSearchInputValue = (inputValue) => ({
    type: searchActionTypes.CHANGE_SEARCH_INPUT_VALUE,
    payload: inputValue,
})

export const clearSearchInputValue = () => ({
    type: searchActionTypes.CLEAR_SEARCH_INPUT_VALUE,
})

export const fetchSearchResultsRequest = (searchQuery) => ({
    type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST,
    payload: searchQuery,
})

export const fetchSearchResultsSuccess = (searchResults) => ({
    type: searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
    payload: searchResults,
})

export const fetchSearchResultsFailure = (errorMessage) => ({
    type: searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE,
    payload: errorMessage,
})

export const fetchSearchResultsAsync = (searchTerm, searchType) => {
    return (dispatch) => {
        dispatch(fetchSearchResultsRequest(searchTerm))

        const payload = { searchTerm: searchTerm, searchType: `${searchType ? searchType : ""}` }
        axios
            .get(`${restql.searchByCriteria}?payload=${encodeURI(JSON.stringify(payload))}`)
            .then((response) => {
                dispatch(fetchSearchResultsSuccess(response.data[0]))
            })
            .catch((err) => {
                dispatch(fetchSearchResultsFailure(err.message))
            })
    }
}
