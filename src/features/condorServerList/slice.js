import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
        name: 'condorServerList',
        initialState: {
            loading: false,
            listData: {},
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
            fetchListRequestReceived: state => {
                state.loading = false
                state.errorMessage = null
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

export const {fetchList, fetchListRequestError, fetchListRequestReceived} = slice.actions

export default slice.reducer