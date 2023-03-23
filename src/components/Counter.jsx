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
        </div>
    )
}
export default Counter;