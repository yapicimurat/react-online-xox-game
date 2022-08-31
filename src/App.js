//
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
//component
import Header from "./components/includes/Header/Header";
import Footer from "./components/includes/Footer/Footer";
import Content from "./components/includes/Content/Content";

import CONFIG from "./config";
import {useSelector} from "react-redux";

function App() {
    const {isGameStarted, isGameFinished} = useSelector(state => state.gameReducer);

    if(isGameStarted === true && isGameFinished === true)
    {

    }


    return (
        <Routes>
            {
                CONFIG.ROUTES.map((route, index) => {
                    return <Route key={index} path={route.path} exact={route.exact} element={route.element}/>
                })
            }
        </Routes>
    );
}

export const GeneralContext = React.createContext();
export default App;
