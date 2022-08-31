//
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {setGameState, setOnline} from "../../../features/game";

//util file
import {truncate} from "../../../utils/stringUtil";


//components
import Game from "../../game/Game";
import GameHead from "../../game/GameHead";
import "./content.css";


function Content({content}){
    const {isOnline, isGameStarted, isGameFinished, boardState, time, turn} = useSelector(state =>  state.gameReducer);

    const dispatch = useDispatch();

    return (
        <section>
            <div className="game-content">
                {content}
            </div>
        </section>
    );
}

export default Content;