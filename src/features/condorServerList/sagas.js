import {put, takeLatest} from 'redux-saga/effects';
import {fetchList, fetchListRequestError, fetchListRequestSuccess} from "./slice";

function* fetchListSaga() {
    try {
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const url = corsProxy + 'https://www.condorsoaring.com/serverlist/?wdt_search=cndr2';
        const tStart = performance.now()
        const html = yield fetch(url, {
            headers: {
                'X-Requested-With': 'node'
            }
        })
        const tEnd = performance.now()
        yield put({type: fetchListRequestSuccess.type, html_body: yield html.text(), time_spent: tEnd - tStart})
    } catch (e) {
        console.error(e)
        yield put({type: fetchListRequestError.type, errorMessage: e.toString()})
    }
}

export function* actionWatcher() {
    yield takeLatest(fetchList.type, fetchListSaga)
}
