//
import { useContext } from "react";
import { GeneralContext } from "../../../App";
//components
import Game from "../../game/Game";

import "./content.css";

function Content(){
    const val = useContext(GeneralContext);

    return (
        <section>
            <div className="game-content">
                <div className="online-offline-section">
                    <a href="#" className="active">
                        PLAY OFFLINE
                    </a>
                    <a href="#">
                        PLAY ONLINE
                    </a>
                </div>
                <Game/>
            </div>
        </section>
    );
}


export default Content;