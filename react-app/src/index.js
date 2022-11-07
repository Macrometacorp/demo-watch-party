import "./index.scss"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux/store"

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
)
