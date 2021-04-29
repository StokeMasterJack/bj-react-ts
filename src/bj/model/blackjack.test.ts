import {Card, Game, Hand} from './blackjack';

const console_logs_Game = false;
const console_logs_Deck = false;

it('test card', () => {
    const c1: Card = new Card(1, 1);
    const c2: Card = new Card(13, 4);

    expect(c1.name).toEqual('Ace of Spades');
    expect(c1.points).toEqual(1);

    expect(c2.name).toEqual('King of Diamonds');
    expect(c2.points).toEqual(10);
});

it('test Hand', () => {
    let h: Hand;
    h = Hand.mk({name: 'Player'});
    expect(h.points).toEqual(0);
    expect(h.msg).toEqual('0 Points.');

    h = h.add(new Card(1, 1));
    expect(h.points).toEqual(1);
    expect(h.msg).toEqual('1 Points.');

    h = h.add(new Card(13, 4));
    expect(h.points).toEqual(11);
    expect(h.msg).toEqual('11 Points.');

    h = h.add(new Card(10, 4));
    expect(h.points).toEqual(21);
    expect(h.msg).toEqual('21 Points. Black Jack!');

    h = h.add(new Card(10, 3));
    expect(h.points).toEqual(31);
    expect(h.msg).toEqual('31 Points. Bust!');

});


it('test Game', () => {
    const g1: Game = Game.mk({shuffle: false});
    expect(g1.ph.cards.length).toEqual(2);
    expect(g1.ph.cards[0].id).toEqual('1-1');
    expect(g1.ph.cards[1].id).toEqual('2-1');
    expect(g1.ph.points).toEqual(3);


    expect(g1.dh.cards.length).toEqual(2);
    expect(g1.dh.cards[0].id).toEqual('3-1');
    expect(g1.dh.cards[1].id).toEqual('4-1');
    expect(g1.dh.points).toEqual(7);

    expect(g1.deck.length).toEqual(48);
    expect(g1.msg).toEqual('Press Hit or Stay.');
    expect(g1.isActive).toEqual(true);

    const g2 = g1.hit();
    expect(g2.ph.cards.length).toEqual(3);
    expect(g2.ph.cards[0].id).toEqual('1-1');
    expect(g2.ph.cards[1].id).toEqual('2-1');
    expect(g2.ph.cards[2].id).toEqual('5-1');
    expect(g2.ph.points).toEqual(8);

    expect(g2.dh.cards.length).toEqual(2);
    expect(g2.dh.points).toEqual(7);

    expect(g2.deck.length).toEqual(47);
    expect(g2.isActive).toEqual(true);
    expect(g2.msg).toEqual('Press Hit or Stay.');

    const g3 = g2.stay();
    expect(g3.ph.cards.length).toEqual(3);

    expect(g3.dh.cards.length).toEqual(4);
    expect(g3.dh.cards[0].id).toEqual('3-1');
    expect(g3.dh.cards[1].id).toEqual('4-1');
    expect(g3.dh.cards[2].id).toEqual('6-1');
    expect(g3.dh.cards[3].id).toEqual('7-1');
    expect(g3.dh.points).toEqual(20);

    expect(g3.deck.length).toEqual(45);
    expect(g3.isActive).toEqual(false);
    expect(g3.msg).toEqual('Dealer Wins!');

    const g4 = g3.deal();

    expect(g4.ph.cards.length).toEqual(2);
    expect(g4.ph.cards[0].id).toEqual('8-1');
    expect(g4.ph.cards[1].id).toEqual('9-1');
    expect(g4.ph.points).toEqual(17);

    expect(g4.dh.cards.length).toEqual(2);
    expect(g4.dh.cards[0].id).toEqual('10-1');
    expect(g4.dh.cards[1].id).toEqual('11-1');
    expect(g4.dh.points).toEqual(20);

    expect(g4.deck.length).toEqual(41);
    expect(g4.msg).toEqual('Press Hit or Stay.');
    expect(g4.isActive).toEqual(true);


    const g5 = g4.hit();

    expect(g5.ph.cards.length).toEqual(3);
    expect(g5.ph.cards[0].id).toEqual('8-1');
    expect(g5.ph.cards[1].id).toEqual('9-1');
    expect(g5.ph.cards[2].id).toEqual('12-1');
    expect(g5.ph.points).toEqual(27);

    expect(g5.deck.length).toEqual(40);
    expect(g5.msg).toEqual('Dealer Wins!');
    expect(g5.isActive).toEqual(false);


    if (console_logs_Game) {
        g5.print();
    }

    if (console_logs_Deck) {
        g5.deck.print();
    }

});
