import React, {CSSProperties} from 'react';
import {useUser} from '../../common';
import {BjAction, OnBjAction} from '../model/blackjack';

export const ButtonsVu = React.memo(({isActive, onAction}: { isActive: boolean, onAction: OnBjAction }) => {

    const onClick = (e: any) => {
        const action: BjAction = {type: e.target.name};
        onAction(action);
    };

    const styleButton: CSSProperties = {
        marginRight: '.5rem'
    };

    const user = useUser();

    return <div style={{display: 'flex', flexDirection: 'column', padding: '1rem'}}>

        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', padding: '1rem'}}>
            <button name="deal" style={styleButton} onClick={onClick} disabled={isActive}>Deal</button>
            <button name="hit" style={styleButton} onClick={onClick} disabled={!isActive}>Hit</button>
            <button name="stay" style={styleButton} onClick={onClick} disabled={!isActive}>Stay</button>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', padding: '1rem',justifyContent:'center'}}>User: {user.firstName} {user.lastName}</div>
    </div>;
});