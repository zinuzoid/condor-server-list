import {createSlice} from "@reduxjs/toolkit";
import {parseListHtml} from "./parser";

const slice = createSlice({
        name: 'condorServerList',
        initialState: {
            loading: false,
            listData: [],
            requestLastTimeSpent: null,
            errorMessage: null
        },
        reducers: {
            fetchList: state => {
                state.loading = true
                state.errorMessage = null
            },
            fetchListRequestError: (state, action) => {
                state.loading = false
                state.errorMessage = action.errorMessage
            },
            fetchListRequestSuccess: (state, action) => {
                state.loading = false
                state.errorMessage = null
                state.listData = parseListHtml(action.html_body)
                state.requestLastTimeSpent = action.time_spent
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

export const selectRequestLastTimeSpent = state => {
    return state.condorServerList.requestLastTimeSpent
}

export const {fetchList, fetchListRequestError, fetchListRequestSuccess} = slice.actions

export default slice.reducer