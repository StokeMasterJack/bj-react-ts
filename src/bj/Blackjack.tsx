import React, {useReducer} from 'react';
import {Game} from './model/blackjack';
import {reducer} from './model/Reducer';
import {BlackjackVu} from './vu/BlackjackVu';




export const Blackjack = () => {
    const [g, dispatch] = useReducer(reducer, Game.mk({shuffle: true}));
    return <BlackjackVu g={g} onAction={dispatch}/>;
};




