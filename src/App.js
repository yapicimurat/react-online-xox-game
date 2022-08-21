//
import React from "react";

//component
import Header from "./components/includes/Header/Header";
import Footer from "./components/includes/Footer/Footer";
import Content from "./components/includes/Content/Content";
import Game from "./components/game/Game";


function App() {


  return (
    <GeneralContext.Provider value={{isOnline: false}}>
      <Header/>
      <Content/>
      <Footer/>
    </GeneralContext.Provider>
  );
}

export default App;
export const GeneralContext = React.createContext();