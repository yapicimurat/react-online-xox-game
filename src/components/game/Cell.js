import "./game.css";

import {useSelector, useDispatch} from "react-redux";
import {setBoardState, setOnline, setOnlineBoardState} from "../../features/game";
import {SOCKET} from "../../app/socket";
import {useEffect} from "react";

function Cell({row, col}){
    const {isGameStarted, isGameFinished, boardState, isOnline, turn, online, socket} = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();


    const move = () => {
        if(isGameStarted === false || boardState[row][col] !== '') return;

        if(isOnline === false && isGameStarted === true && isGameFinished === false)
        {
            dispatch(setBoardState({
                row: row,
                col: col
            }));
        }
        else if(isOnline === true){
            const me = (socket.id === online.xPlayerSocketId) ? 'X' : 'O';
            if(online.isGameStarted === true && online.isGameFinished === false &&
            turn === me){
                //the turn is mine
                socket.emit(SOCKET.EVENTS.SERVER_GAME_MOVE, {
                    gameState : online,
                    row: row,
                    col: col,
                    symbol: me,
                    gameKey: online.gameKey
                });
            }
        }
    };
    return (
        <button onClick={() => {move()}} className="stone">{boardState[row][col]}</button>
    );
}

export default Cell;