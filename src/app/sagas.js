import {actionWatcher} from "../features/condorServerList/sagas";
import {all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

export function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}

export const middleware = createSagaMiddleware();