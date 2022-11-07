import { combineReducers } from "redux"
import persistReducer from "redux-persist/es/persistReducer"
import storage from "redux-persist/lib/storage"

import movies from "./movies"
import series from "./series"
import search from "./search"
import detailModal from "./modal"

const persistConfig = {
    key: "root",
    storage,
    whitelist: [],
}

const rootReducer = combineReducers({
    search,
    movies,
    series,
    detailModal,
})

export default persistReducer(persistConfig, rootReducer)
