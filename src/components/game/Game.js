
//components
import Board from "./Board";
import "./game.css";

import {useSelector, useDispatch} from "react-redux";
import {setBoardState,setTurn, setGameState, setOnline} from "../../features/game";
import GameHead from "./GameHead";
import clsx from "clsx";
import Result from "./Result";
import {useEffect} from "react";
import {SOCKET} from "../../app/socket";


function Game(){
    const {isGameStarted, isGameFinished, boardState, isOnline, turn, theWinner, online, socket} = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();

    const determineTheWinner = (symbol) => {
        let gameHasWinner = false;

        if(((boardState[0][0] === symbol && boardState[0][1] === symbol && boardState[0][2] === symbol) ||
                (boardState[1][0] === symbol && boardState[1][1] === symbol && boardState[1][2] === symbol) ||
                (boardState[2][0] === symbol && boardState[2][1] === symbol && boardState[2][2] === symbol)) ||
            ((boardState[0][0] === symbol && boardState[1][0] === symbol && boardState[2][0] === symbol) ||
                (boardState[0][1] === symbol && boardState[1][1] === symbol && boardState[2][1] === symbol) ||
                (boardState[0][2] === symbol && boardState[1][2] === symbol && boardState[2][2] === symbol)) ||
            ((boardState[0][0] === symbol && boardState[1][1] === symbol && boardState[2][2] === symbol) ||
                (boardState[0][2] === symbol && boardState[1][1] === symbol && boardState[2][0] === symbol))){
            gameHasWinner = true;
        }
        return (gameHasWinner === true) ? symbol : null;
    };

    const isBoardFull = () => {
        for(let row = 0; row < boardState.length; row++)
        {
            for(let col = 0; col < boardState[row].length; col++){
                if(boardState[row][col] === ''){
                    return false;
                }
            }
        }
        return true;
    };

    const GAME_STATE = {
        ONLINE: true,
        OFFLINE: false
    };

    //FOR OFFLINE
    useEffect(() => {
        if(isGameStarted === true && isGameFinished === false)
            checkWinner();
    }, [boardState]);

    useEffect(() => {
        socket?.on(SOCKET.EVENTS.CLIENT_GAME_MOVE, data => {
            dispatch(setTurn());
            dispatch(setOnline({online : data.online, isOnline: true}))
        });
    }, []);

    const checkWinner = () => {
        let theWinner = {
            winnerX: (determineTheWinner('X') !== null),
            winnerO: (determineTheWinner('O') !== null),
        };
        //The winner is X
        if(theWinner.winnerX){
            dispatch(setGameState({isGameFinished : true, theWinner: 'X'}));
        }else{
            //The winner is O
            if(theWinner.winnerO){
                dispatch(setGameState({isGameFinished : true, theWinner: 'O'}));
            }else{
                //There is no the winner, draw
                if(isBoardFull() === true){
                    dispatch(setGameState({isGameFinished : true, theWinner: 'XO'}));
                }
            }
        }
    };

    return (
        <>
            <GameHead playerLeftName="Player X" playerRightName="Player O"/>
            <div className="online-offline-section">
                <a  className={clsx({'active': (!isOnline)})}>
                    OFFLINE
                </a>
                <a className={clsx({'active': !!(isOnline)})}>
                    ONLINE
                </a>
            </div>
            {(
                (isGameFinished === false) ? <Board/> : <Result theWinner={theWinner}/>
            )}
        </>
    );
}

export default Game;