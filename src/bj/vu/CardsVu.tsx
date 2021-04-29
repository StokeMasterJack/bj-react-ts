import React from 'react';
import {Card} from '../model/blackjack';

export const CardsVu = ({cards}: { cards: readonly Card[] }) => {

    const mf = (c: Card) => {
        return <div key={c.id}>{c.name}</div>;
    };

    return <div>
        <div>
            {cards.map(mf)}
        </div>
    </div>;
};