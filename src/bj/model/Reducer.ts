//Reducer -  a pure function
import {BjAction, Game} from './blackjack';

export const reducer = (g: Game, action: BjAction): Game => {
    switch (action.type) {
        case 'deal':
            return g.deal();
        case 'hit':
            return g.hit();
        case 'stay':
            return g.stay();
        default:
            throw Error();
    }
};

export const reducer1 = (g: Game, action: BjAction): Game => {
    return g.update(action);
};
