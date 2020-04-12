import React from 'react';
import {Counter} from './features/counter/Counter';
import './App.css';
import {CondorServerList} from "./features/condorServerList/CondorServerList";

function App() {
    return (
        <div className="App">
            <CondorServerList/>
            <Counter/>
        </div>
    );
}

export default App;
