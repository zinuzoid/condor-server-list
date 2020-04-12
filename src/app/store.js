import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import condorServerListReducer from '../features/condorServerList/slice';
import {middleware} from "./sagas";

export default configureStore({
    reducer: {
        counter: counterReducer,
        condorServerList: condorServerListReducer
    },
    middleware: [middleware, ...getDefaultMiddleware()]
});
