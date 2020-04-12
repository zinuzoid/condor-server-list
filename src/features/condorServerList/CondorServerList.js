import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectLoading, fetchList, selectErrorMessage} from "./slice";
import {MoonLoader} from "react-spinners";


export function CondorServerList() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading)
    const errorMessage = useSelector(selectErrorMessage)

    function onFetch() {
        dispatch(fetchList())
    }

    return <div>
        <h1>Condor</h1>
        <p style={{color: 'red'}}>{errorMessage}</p>
        <span><MoonLoader
            loading={loading}
        /></span>
        <button onClick={onFetch}>Fetch</button>
    </div>
}