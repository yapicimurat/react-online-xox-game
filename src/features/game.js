import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOnline: false,
    online: {

    },
    isGameStarted: false,
    isGameFinished: false,
    boardState: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    //next turn, X or O as string
    turn: 'X',
    theWinner: null,
    time: null,
    socket: null,
    shortCode: null
};

const clearGame = (state) => {
    state.boardState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    state.turn = 'X';
}


export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setOnline: (state, action) => {
            state.isOnline = action.payload?.isOnline;
            state.online = action.payload?.online;
            if(action.payload.online !== undefined){
                state.boardState = action.payload.online.boardState;
            }
        },
        setTurn: state => {
            state.turn = (state.turn === 'X') ? 'O' : 'X';
        },
        setOnlineBoardState: (state, action) => {
            state.online.boardState[action.payload.row][action.payload.col] = state.turn;
        },
        setGameState: (state, action) => {
            if(action.payload?.isGameStarted === true && action.payload?.isGameFinished === false)
                state.turn = 'X';

            if(action.payload.theWinner !== undefined){
                state.theWinner = action.payload.theWinner;
                clearGame(state);
            }
            if(action.payload.isOnline !== undefined) state.isOnline = action.payload.isOnline;
            state.isGameStarted = action.payload?.isGameStarted;
            state.isGameFinished = action.payload?.isGameFinished;
        },
        setTheWinner: (state, action) => {
            state.theWinner = action.payload.theWinner;
            state.isOnline = false;
        },
        setBoardState: (state, action) => {
            if(state.boardState[action.payload.row][action.payload.col] === ''){
                state.boardState[action.payload.row][action.payload.col] = state.turn.toUpperCase();
                state.turn = (state.turn === 'X') ? 'O' : 'X';
            }
        },
        setSocket: (state, action) => {
            state.socket = action.payload.socket;
        },
        setShortCode: (state, action) => {
            state.shortCode = action.payload.shortCode;
        }
    }
});

export const {setOnline, setGameState,setTurn, setTheWinner, setBoardState, setShortCode, setSocket, setOnlineBoardState} = gameSlice.actions;
export default gameSlice.reducer;