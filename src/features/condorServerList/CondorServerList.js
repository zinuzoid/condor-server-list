import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectLoading, fetchList, selectErrorMessage, selectRequestLastTimeSpent, selectListData} from "./slice";
import {MoonLoader} from "react-spinners";
import Table, {Styles} from "./table";

export function CondorServerList() {
    const requestLastTimeSpent = useSelector(selectRequestLastTimeSpent);
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => onFetch(), []);
    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name',
        }, {
            Header: 'Landscape',
            accessor: 'landscape',
        }, {
            Header: 'ServerStatus',
            accessor: 'serverStatus',
        }, {
            Header: 'Task',
            accessor: 'length',
        }, {
            Header: 'Players',
            accessor: 'playerNum',
        }, {
            Header: 'Private',
            accessor: 'isPrivate',
        },
    ], [])

    function onFetch() {
        dispatch(fetchList())
    }

    return <div>
        <h1>Condor</h1>
        <p style={{color: 'red'}}>{useSelector(selectErrorMessage)}</p>
        <span>
            <MoonLoader loading={useSelector(selectLoading)}/>
        </span>
        {requestLastTimeSpent && <p>{Math.round(requestLastTimeSpent)}</p>}
        <button onClick={onFetch}>Fetch</button>
        <Styles>
            <Table columns={columns} data={useSelector(selectListData)}/>
        </Styles>
    </div>
}