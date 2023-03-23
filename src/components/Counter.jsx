import React from 'react';
import * as actionTypes from '../store/action-types';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
    const number = useSelector(state => state.number);
    const dispatch = useDispatch();

    return (
        <div>
            <p>{number}</p>
            <button onClick={() => dispatch({ type: actionTypes.ADD })}>+</button>
            <button onClick={() => dispatch({ type: actionTypes.ASYNC_ADD })}>asyncADD 异步+1</button>
            <button onClick={() => dispatch({ type: actionTypes.STOP_ADD })}>stop</button>
        </div>
    )
}
export default Counter;