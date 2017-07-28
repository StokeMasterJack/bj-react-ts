export class Card {
  // private value: number;
  // private suit: number;

  constructor(private value: number, private suit: number) {
    // this.value = value;
    // this.suit = suit;
  }

  get suitName() {
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

  get valueName() {
    if (this.value === 1) return "Ace";
    if (this.value > 1 && this.value < 11) return String(this.value);
    if (this.value === 11) return "Jack";
    if (this.value === 12) return "Queen";
    if (this.value === 13) return "King";
    throw new Error(`Bad value: ${this.value}`);
  }

  get name() {
    return `${this.valueName} of ${this.suitName}`;
  }

  get id() {
    return `${this.value}-${this.suit}`;
  }

  get points() {
    if (this.value >= 1 && this.value <= 10) return this.value;
    if (this.value >= 11 && this.value <= 13) return 10;
    throw new Error(`Bad value: ${this.suit}`);
  }

  copy() {
    return new Card(this.value, this.suit);
  }
}

export class Hand {
  cards: Array<Card> = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  add(card: Card) {
    this.cards.push(card);
  }

  get points() {
    return this.cards.reduce((rt, c) => rt + c.points, 0);
  }

  print() {
    console.log(`${this.name} Hand`);
    for (const c of this.cards) {
      console.log(c.name);
    }
    console.log(`${this.points} Points`);
  }

  copy() {
    const cp = new Hand(this.name);
    cp.cards = [...this.cards];
    return cp;
  }
}

export class Deck {
  private cards: Array<Card>;

  constructor() {
    this.cards = [];
    for (let s = 1; s <= 4; s++) {
      for (let v = 1; v <= 13; v++) {
        this.cards.push(new Card(v, s));
      }
    }
    for (let i = 0; i < 10000; i++) {
      const i1 = Math.floor(Math.random() * 51);
      const i2 = Math.floor(Math.random() * 51);
      const c1 = this.cards[i1];
      const c2 = this.cards[i2];
      this.cards[i2] = c1;
      this.cards[i1] = c2;
    }
  }

  take(): Card {
    if (this.cards.length === 0) throw Error();
    return this.cards.shift()!;
  }

  print() {
    for (const c of this.cards) {
      console.log(c.name);
    }
  }

  copy() {
    const cp = new Deck();
    cp.cards = [...this.cards];
    return cp;
  }
}



export class Game {

  deck:Deck;
  ph:Hand;
  dh:Hand;

  constructor() {
    this._deal();
  }

  _deal() {
    this.deck = new Deck();
    this.ph = new Hand("Player");
    this.dh = new Hand("Dealer");
    this.ph.add(this.deck.take());
    this.ph.add(this.deck.take());
    this.dh.add(this.deck.take());
    this.dh.add(this.deck.take());
  }

  _hit = () => {
    this.ph.add(this.deck.take());
  };

  _stay() {
    while (this.dh.points < 17) this.dh.add(this.deck.take());
  }

  print() {
    console.log("--------");
    this.ph.print();
    console.log("--------");
    this.dh.print();
  }

  copy() {
    const cp = new Game();
    cp.deck = this.deck.copy();
    cp.ph = this.ph.copy();
    cp.dh = this.dh.copy();
    return cp;
  }

  deal(): Game {
    const cp = this.copy();
    cp._deal();
    return cp;
  }

  hit(): Game {
    const cp = this.copy();
    cp._hit();
    return cp;
  }

  stay(): Game {
    const cp = this.copy();
    cp._stay();
    return cp;
  }
}

