import {configureStore} from "@reduxjs/toolkit";
import gameReducer from "../features/game";

export const store = configureStore({
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })

    },
    reducer: {
        gameReducer: gameReducer
    },
});