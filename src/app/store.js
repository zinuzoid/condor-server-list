import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import condorServerListReducer from '../features/condorServerList/slice';
import {middleware} from "./sagas";

export default configureStore({
    reducer: {
        condorServerList: condorServerListReducer
    },
    middleware: [middleware, ...getDefaultMiddleware()]
});
