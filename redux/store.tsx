import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./reducers/appReducer";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
const reducer = {
    appReducer: appReducer,
}

const store= configureStore({
    // @ts-ignore
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
},);

export default store;