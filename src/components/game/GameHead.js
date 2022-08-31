import clsx from "clsx";
import {truncate} from "../../utils/stringUtil";
import {useSelector, useDispatch} from "react-redux";
import {setGameState, setShortCode, setSocket} from "../../features/game";
import {useEffect} from "react";

function GameHead({playerLeftName, playerRightName}){

    const {isOnline,isGameStarted,turn,boardState,isGameFinished, socket, online} = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();


    const startGame = () => {
        if(isOnline === true) {
            //TODO: BURAYI KONTROL ET...
        }
        dispatch(setGameState({isGameStarted: true, isGameFinished : false}));
    };

    if(isGameStarted === false)
        return (
            <div className="game-head">
                <button onClick={() => {startGame()}} className="default-button start-game">Oyunu Başlat!</button>
            </div>
        );

    return (
        <div className="game-head">
            <div className="game-mode">
                <small>{(isOnline) ? "ONLINE" : "OFFLINE"}</small>
            </div>
            <div className="game-head-content">
                <div className="player-information">
                    <div className="left-side">
                        <p className={clsx({'turn': (turn === 'X'), 'me' : (isOnline === true && socket?.id === online.xPlayerSocketId)})} title={playerLeftName}>{truncate(playerLeftName, 15)}</p>
                    </div>
                    <div className="right-side">
                        <p className={clsx({'turn': (turn === 'O'), 'me' : (isOnline === true && socket?.id === online.oPlayerSocketId)})} title={playerRightName}>{truncate(playerRightName, 15)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameHead;