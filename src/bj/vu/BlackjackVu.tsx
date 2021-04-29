import React from 'react';
import {Game, OnBjAction} from '../model/blackjack';
import {ButtonsVu} from './ButtonsVu';
import {HandVu} from './HandVu';

export const BlackjackVu = ({g, onAction}: { g: Game, onAction: OnBjAction }) => {
    return <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff',padding:'1rem'}}>
        <h1 style={{color: 'black'}}>Black Jack</h1>
        <div style={{marginBottom: '1rem', fontWeight: 'bold', fontSize: 20, color: 'indianred'}}>{g.msg}</div>

        <div style={{display: 'flex', marginBottom: '.5rem'}}>
            <HandVu h={g.ph}/>
            <div style={{marginRight: '1rem'}}/>
            <HandVu h={g.dh}/>
        </div>

        <ButtonsVu isActive={g.isActive} onAction={onAction}/>
    </div>;
};