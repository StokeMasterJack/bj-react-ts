import React, {CSSProperties} from 'react';
import {Hand} from '../model/blackjack';
import {CardsVu} from './CardsVu';

export const HandVu = ({h}: { h: Hand }) => {


    const styleRoot: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EEEEEE',
        padding: '.5rem',
        width: '15rem',
        height: '10rem',
        // color: 'aquamarine'
    };

    const styleTitle: CSSProperties = {
        fontWeight: 'bold',
        color: 'indianred'
    };

    const styleCards: CSSProperties = {
        flexGrow: 1,
        marginTop: '.5rem'
    };


    return <div style={styleRoot}>
        <div style={styleTitle}>{h.name} Hand</div>
        <div style={styleCards}>
            <CardsVu cards={h.cards}/>
        </div>
        <div style={styleTitle}>{h.msg}</div>
    </div>;
};