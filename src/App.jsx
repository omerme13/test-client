import { useState } from "react";

import Loading from "./components/Loading/Loading";
import Users from "./components/Users/Users";
import AppBar from "./components/AppBar/AppBar";
import { sortOptions } from "./utils/sortOptions";

import "./App.scss";


function App() {
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState(sortOptions.firstName.value);

    return (
        <>
            <div className="App">
                <AppBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
                <Users searchText={searchText} sortBy={sortBy} />
            </div>
            <Loading />
        </>
    );
}

export default App;
