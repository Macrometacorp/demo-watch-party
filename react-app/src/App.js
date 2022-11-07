import { extendTheme, ChakraProvider } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Route, Switch, Redirect, useLocation } from "react-router-dom"
import { theme as mmTheme } from "./chakra-ui-theme/index"
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import Movies from "./pages/Movies/Movies"
import TVSeries from "./pages/TVSeries/TVSeries"
import Search from "./pages/Search/Search"
import Category from "./pages/Category/Category"
import WatchParty from "./pages/WatchParty/WatchParty"
import DetailModal from "./components/DetailModal/DetailModal"
import VideoPlayer from "./components/VideoPlayer/VideoPlayer"
import { selectSearchResults } from "./redux/search/search.selectors"

const theme = extendTheme(mmTheme)
const App = () => {
    const searchResults = useSelector(selectSearchResults)
    const location = useLocation()

    return (
        <div className="App">
            <Navbar />
            <DetailModal />
            <Switch location={location} key={location.pathname}>
                <Route exact path="/">
                    <Redirect to="/browse" />
                </Route>
                <Route path="/play" component={VideoPlayer} />
                <Route path="/search" render={() => searchResults && <Search results={searchResults} />} />
                <Route exact path="/browse" render={() => <Homepage />} />
                <Route exact path="/browse/:categoryName" render={(props) => <Category {...props} />} />
                <Route exact path="/tvseries" render={() => <TVSeries />} />
                <Route exact path="/tvseries/:categoryName" render={(props) => <Category {...props} />} />
                <Route exact path="/movies" render={() => <Movies />} />
                <Route exact path="/movies/:categoryName" render={(props) => <Category {...props} />} />
                <Route
                    exact
                    path="/together/:watchPartyId"
                    render={() => (
                        <ChakraProvider theme={theme}>
                            <WatchParty />
                        </ChakraProvider>
                    )}
                />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </div>
    )
}

export default App
