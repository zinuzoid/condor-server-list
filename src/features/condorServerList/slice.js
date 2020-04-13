import {createSlice} from "@reduxjs/toolkit";
import {parseListHtml} from "./parser";

const slice = createSlice({
        name: 'condorServerList',
        initialState: {
            loading: false,
            listData: [],
            requestLastTimeSpent: null,
            requestLastTimestamp: null,
            errorMessage: null,
            fetchInterval: 120000
        },
        reducers: {
            fetchList: state => {
                state.loading = true
                state.errorMessage = null
            },
            fetchListRequestError: (state, action) => {
                state.loading = false
                state.errorMessage = action.payload.errorMessage
                state.requestLastTimestamp = Date.now()
            },
            fetchListRequestSuccess: (state, action) => {
                state.loading = false
                state.errorMessage = null
                state.listData = parseListHtml(action.payload.html_body)
                state.requestLastTimeSpent = action.payload.time_spent
                state.requestLastTimestamp = Date.now()
            },
            updateFetchInterval: (state, action) => {
                state.fetchInterval = action.payload.fetchInterval
            }
        }
    }
)

export const selectLoading = state => {
    return state.condorServerList.loading
}

export const selectErrorMessage = state => {
    return state.condorServerList.errorMessage
}

export const selectListData = state => {
    return state.condorServerList.listData
}

export const selectListDataFiltered = state => {
    return state.condorServerList.listData
        .filter(i => i.isPrivate === 'No' &&
            (i.landscape.includes('Slovenia') || i.landscape.includes('South East UK')) &&
            i.serverStatus.includes('Join')
        ).sort((a, b) => {
            const cmp = a.landscape.localeCompare(b.landscape)
            if (cmp !== 0) return -cmp

            const a_num = a.playerNum.includes('/') ? a.playerNum.split('/')[0] : a.playerNum
            const b_num = b.playerNum.includes('/') ? b.playerNum.split('/')[0] : b.playerNum
            return b_num - a_num
        })
}

export const selectRequestLastTimeSpent = state => {
    return state.condorServerList.requestLastTimeSpent
}

export const selectRequestLastTimestamp = state => {
    return state.condorServerList.requestLastTimestamp
}

export const selectFetchInterval = state => {
    return state.condorServerList.fetchInterval
}

export const {fetchList, fetchListRequestError, fetchListRequestSuccess, updateFetchInterval} = slice.actions

export default slice.reducer