import {put, takeLatest} from 'redux-saga/effects';
import {fetchList, fetchListRequestError, fetchListRequestReceived} from "./slice";

function* fetchListSaga() {
    try {
        const url = 'https://cors-anywhere.herokuapp.com/' + 'https://www.condorsoaring.com/serverlist/?wdt_search=cndr2';
        const html = yield fetch(url, {
            headers: {
                'X-Requested-With': 'node'
            }
        })
        console.log(html)
        yield put({type: fetchListRequestReceived.type, html_body: yield html.text()})
    } catch (e) {
        yield put({type: fetchListRequestError.type, errorMessage: e.toString()})
    }
}

export function* actionWatcher() {
    yield takeLatest(fetchList.type, fetchListSaga)
}
