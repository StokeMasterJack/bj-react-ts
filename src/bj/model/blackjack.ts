export class Card {

    readonly value: number;
    readonly suit: number;

    constructor(value: number, suit: number) {
        if (value < 1 || value > 13) throw Error(`IllegalArgument. Bad card value[${value}]`);
        if (suit < 1 || suit > 4) throw Error(`IllegalArgument. Bad card suit[${suit}]`);
        this.value = value;
        this.suit = suit;
    }

    get suitName(): string {
        switch (this.suit) {
            case 1:
                return "Spades";
            case 2:
                return "Hearts";
            case 3:
                return "Clubs";
            case 4:
                return "Diamonds";
            default:
                throw new Error(`Bad suit: ${this.suit}`);
        }
    }

    get valueName(): string {
        if (this.value === 1) return "Ace";
        if (this.value > 1 && this.value < 11) return String(this.value);
        if (this.value === 11) return "Jack";
        if (this.value === 12) return "Queen";
        if (this.value === 13) return "King";
        throw new Error(`Bad value: ${this.value}`);
    }

    get name(): string {
        return `${this.valueName} of ${this.suitName}`;
    }

    get id(): string {
        return `${this.value}-${this.suit}`;
    }

    get points(): number {
        if (this.value >= 1 && this.value <= 10) return this.value;
        if (this.value >= 11 && this.value <= 13) return 10;
        throw new Error(`Bad value: ${this.suit}`);
    }


}

export class Deck {

    readonly cards: readonly Card[];
    readonly nextCard: number;
    readonly shuffle: boolean;

    private constructor({cards, nextCard, shuffle}: { cards: readonly Card[], nextCard: number, shuffle: boolean }) {
        this.cards = cards;
        this.nextCard = nextCard;
        this.shuffle = shuffle;
    }

    static mk({shuffle}: { shuffle: boolean }): Deck {
        return new Deck({
                cards: Deck.createCards({shuffle}),
                nextCard: 0,
                shuffle
            }
        );
    }

    get cardsUnused(): readonly Card[] {
        return this.cards.slice(this.nextCard);
    }

    get cardsLeft(): number {
        return this.cards.length - this.nextCard;
    }

    get length(): number {
        return this.cardsLeft;
    }

    private static createCards({shuffle}: { shuffle: boolean }): readonly Card[] {
        const a = [];
        for (let s = 1; s <= 4; s++) {
            for (let v = 1; v <= 13; v++) {
                a.push(new Card(v, s));
            }
        }
        if (shuffle) {
            for (let i = 0; i < 10000; i++) {
                const i1 = Math.floor(Math.random() * 51);
                const i2 = Math.floor(Math.random() * 51);
                const c1: Card = a[i1];
                const c2: Card = a[i2];
                a[i2] = c1;
                a[i1] = c2;
            }
        }
        return a;
    }

    take(num: number): readonly [readonly Card[], Deck] {
        const dd: Deck = this.cardsLeft < num ? Deck.mk({shuffle: this.shuffle}) : this;
        const i1: number = dd.nextCard;
        const i2: number = i1 + num;
        const cardsRet = dd.cards.slice(i1, i2);
        const deckRet: Deck = new Deck({...dd, nextCard: i2});
        return [cardsRet, deckRet];
    }

    print() {
        console.group("Deck");
        this.cardsUnused.forEach(c => console.debug(c.name));
        console.groupEnd();
    }

}

export class Hand {

    readonly name: string;
    readonly cards: readonly Card[];

    private constructor({name, cards}: { name: string, cards: readonly Card[] }) {
        this.name = name;
        this.cards = cards;
    }

    static mk({name}: { name: string }): Hand {
        return new Hand({name, cards: []});
    }

    clear(cards: readonly Card[]) {
        return new Hand({name: this.name, cards: [...cards]});
    }

    add(cards: readonly Card[] | Card): Hand {
        const a = Array.isArray(cards) ? cards : [cards];
        return new Hand({name: this.name, cards: [...this.cards, ...a]});
    }

    get points(): number {
        return this.cards.reduce((rt, c) => rt + c.points, 0);
    }

    get msg(): string {
        const p = this.points;
        if (p > 21) return `${p} Points. Bust!`;
        if (p === 21) return `${p} Points. Black Jack!`;
        return `${p} Points.`;
    }

    print() {
        console.group(`${this.name} Hand`);
        this.cards.forEach(c => console.debug(c.name));
        console.log(this.msg);
        console.groupEnd();
    }

}

export class Game {

    readonly deck: Deck;
    readonly ph: Hand;
    readonly dh: Hand;
    readonly isStay: boolean;

    private constructor({deck, ph, dh, isStay}: { deck: Deck, ph: Hand, dh: Hand, isStay: boolean }) {
        this.deck = deck;
        this.ph = ph;
        this.dh = dh;
        this.isStay = isStay;
    }

    copy(delta: Partial<Game>): Game {
        return new Game({...this, ...delta});
    }

    static mk({shuffle}: { shuffle: boolean }): Game {
        return new Game({
            deck: Deck.mk({shuffle}),
            ph: Hand.mk({name: "Player"}),
            dh: Hand.mk({name: "Dealer"}),
            isStay: false
        }).deal();
    }

    deal(): Game {
        const [cards, deck] = this.deck.take(4);
        console.assert(cards.length === 4);
        const ph = this.ph.clear(cards.slice(0, 2));
        const dh = this.dh.clear(cards.slice(2, 4));
        return this.copy({deck, ph, dh, isStay: false});
    }

    hit(): Game {
        const [cards, deck] = this.deck.take(1);
        console.assert(cards.length === 1);
        const ph = this.ph.add(cards);
        return this.copy({deck, ph});
    }

    stay(): Game {
        let dh = this.dh;
        let deck = this.deck;
        while (dh.points < 17) {
            const [cards, d] = deck.take(1);
            dh = dh.add(cards);
            deck = d;
        }
        return this.copy({
            isStay: true,
            dh,
            deck
        });
    }

    update(action: BjAction): Game {
        switch (action.type) {
            case "deal":
                return this.deal();
            case "hit":
                return this.hit();
            case "stay":
                return this.stay();
            default:
                throw Error();
        }

    }

    get isActive(): boolean {
        return !this.isStay && this.ph.points < 21;
    }

    get msg(): string {
        const g = this;
        if (g.isActive) return "Press Hit or Stay.";
        if (g.dh.points > 21) return "Player Wins!";
        if (g.ph.points > 21) return "Dealer Wins!";
        if (g.ph.points > g.dh.points) return "Player Wins!";
        return "Dealer Wins!";
    }

    // noinspection JSUnusedGlobalSymbols
    print() {
        console.group("Blackjack");
        this.ph.print();
        this.dh.print();
        console.groupEnd();
    }


}

// export type BjAction = 'd' | 'h' | 's';
export type OnBjAction = (action: BjAction) => void;

export type BjAction = {
    type: "deal" | "hit" | "stay"
}

