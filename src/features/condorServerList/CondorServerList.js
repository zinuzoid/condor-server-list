import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectLoading,
    fetchList,
    updateFetchInterval,
    selectErrorMessage,
    selectRequestLastTimeSpent,
    selectRequestLastTimestamp,
    selectListDataFiltered,
    selectFetchInterval
} from "./slice";
import {MoonLoader} from "react-spinners";
import Table, {Styles} from "./table";
import moment from "moment";

export function CondorServerList() {
    const requestLastTimeSpent = useSelector(selectRequestLastTimeSpent);
    const requestLastTimestamp = useSelector(selectRequestLastTimestamp);
    const fetchInterval = useSelector(selectFetchInterval);
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onFetch, [])
    useEffect(() => {
            const timer = setTimeout(() => {
                onFetch()
            }, fetchInterval)
            return () => clearTimeout(timer)
        }
        , [requestLastTimestamp])

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

    function onFetch(_e) {
        dispatch(fetchList())
    }

    function onFetchIntervalInputChange(e) {
        dispatch(updateFetchInterval({fetchInterval: e.target.value}))
    }

    return <div>
        <h1>Condor</h1>
        <p style={{color: 'red'}}>{useSelector(selectErrorMessage)}</p>
        <span>
            <MoonLoader loading={useSelector(selectLoading)}/>
        </span>
        {requestLastTimeSpent &&
        <p>{Math.round(requestLastTimeSpent)}ms / {moment(requestLastTimestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>}
        <input type="text" value={fetchInterval} onChange={onFetchIntervalInputChange}/>
        <button onClick={onFetch}>Fetch</button>
        <Styles>
            <Table columns={columns} data={useSelector(selectListDataFiltered)}/>
        </Styles>
    </div>
}