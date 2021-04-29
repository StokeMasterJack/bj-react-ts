import React, {useState} from 'react';

type Int = number

interface CountAction {
    type: 'increment' | 'reset' | 'fetchLatest' | 'fetchComplete'
    payload?: Result<Int>
}

type CountDispatch = (action: CountAction) => void;

type NetworkState = 'idle' | 'success' | 'error' | 'pending'

interface CountVuProps {
    countState: CountState,
    dispatch: CountDispatch
}


function countReducer(oldState: CountState, action: CountAction): CountState {
    switch (action.type) {
        case 'increment':
            return {count: oldState.count + 1, result: null};
        case 'reset':
            return {count: 1, result: null};
        case 'fetchLatest':
            return {...oldState, result: {data: null, error: null}};
        case 'fetchComplete':
            const result: Result<Int> = action.payload!!;
            const newCount = result.data !== null ? result.data : oldState.count;
            return {count: newCount, result: result};
        default:
            throw Error();
    }
}


function computeNetworkState<T>(result: Result<T> | null): NetworkState {
    if (result === null) return 'idle';
    else if (result.error === null && result.data === null) return 'pending';
    else if (result.error === null && result.data !== null) return 'success';
    else if (result.error !== null && result.data === null) return 'error';
    else throw Error();
}


async function fetchLatestCount(): Promise<Result<Int>> {
    const latest = Math.floor(Math.random() * 5);
    if (latest === 4) {
        return {data: null, error: 'Fetch failed'};
    } else {
        return {data: latest, error: null};
    }

}


interface Result<T> {
    data: T | null
    error: any | null
}

interface CountState {
    count: Int
    result: Result<Int> | null
}

export const Count = () => {

    const [countState, setCountState] = useState<CountState>({count: 1, result: null});

    async function dispatch(action: CountAction) {
        const newCountState = countReducer(countState, action);
        setCountState(newCountState);

        if (action.type === 'fetchLatest') {
            const result = await fetchLatestCount();
            dispatch({type: 'fetchComplete', payload: result}).then();
        }


    }

    return <CountVu countState={countState} dispatch={dispatch}/>;
};


function CountVu(props: CountVuProps) {
    const {countState, dispatch} = props;
    const {count, result} = countState;

    function incrementOnClick() {
        dispatch({type: 'increment'});
    }

    function resetOnClick() {
        dispatch({type: 'reset'});
    }

    function fetchLatestOnClick() {
        dispatch({type: 'fetchLatest'});
    }

    const networkState = computeNetworkState(result);

    return <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', padding: '1rem'}}>
        <h1 style={{color: 'black'}}>Counter</h1>

        <div style={{display: 'flex'}}>
            <button onClick={incrementOnClick}>Increment</button>
            <button onClick={resetOnClick}>Reset</button>
            <button onClick={fetchLatestOnClick}>Fetch</button>
        </div>

        <div>{count}</div>
        <div>{networkState}</div>
    </div>;
}
