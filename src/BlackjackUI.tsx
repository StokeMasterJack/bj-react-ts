import React from "react";
import {CSSProperties, useState} from "react";
import {useCallback} from "react";
import {Game, Hand, Card} from "blackjack";

type Action = "d" | "h" | "s";
type OnAction = (action: Action) => void;

const map = new Map<OnAction, OnAction>();

const ButtonsVu = React.memo(({isActive, onAction}: { isActive: boolean, onAction: OnAction }) => {

    const onClick = (e: any) => {
        const action = e.target.name as Action;
        onAction(action);
    };

    const styleButton: CSSProperties = {
        marginRight: ".5rem"
    };

    map.set(onAction, onAction);
    console.log("map.size: ", map.size);

    return <div>
        <button name='d' style={styleButton} onClick={onClick} disabled={isActive}>Deal</button>
        <button name='h' style={styleButton} onClick={onClick} disabled={!isActive}>Hit</button>
        <button name='s' style={styleButton} onClick={onClick} disabled={!isActive}>Stay</button>
    </div>;
});

const CardsVu = React.memo(({cards}: { cards: readonly Card[] }) => {

    const mf = (c: Card) => {
        return <div key={c.id}>{c.name}</div>;
    };

    return <div>
        <div>
            {cards.map(mf)}
        </div>
    </div>;
});

const HandVu = React.memo(({h}: { h: Hand }) => {

    const styleRoot: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EEEEEE",
        padding: ".5rem",
        width: "15rem",
        height: "10rem"
    };

    const styleTitle: CSSProperties = {
        fontWeight: "bold",
        color: "indianred"
    };

    const styleCards: CSSProperties = {
        flexGrow: 1,
        marginTop: ".5rem"
    };


    return <div style={styleRoot}>
        <div style={styleTitle}>{h.name} Hand</div>
        <div style={styleCards}>
            <CardsVu cards={h.cards}/>
        </div>
        <div style={styleTitle}>{h.msg}</div>
    </div>;
});

const BlackjackVu = React.memo(({g, onAction}: { g: Game, onAction: OnAction }) => {
    return <div>
        <h1 style={{color: "indianred"}}>Black Jack</h1>
        <div style={{marginBottom: "1rem", fontWeight: "bold", fontSize: 20, color: "rebeccapurple"}}>{g.msg}</div>
        <div style={{display: "flex", marginBottom: ".5rem"}}>
            <HandVu h={g.ph}/>
            <div style={{marginRight: "1rem"}}/>
            <HandVu h={g.dh}/>
        </div>

        <ButtonsVu isActive={g.isActive} onAction={onAction}/>
    </div>;
});


const updateGame = (g: Game, action: Action): Game => {
    switch (action) {
        case "d":
            return g.deal();
        case "h":
            return g.hit();
        case "s":
            return g.stay();
        default:
            throw Error();
    }
};

class Foo extends React.Component<any, { x: number, y: number }> {


    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            x: 10,
            y: 10
        };
    }

    onClick = (e: any) => {
        this.setState({x: 3});
    };

    render() {
        return <div>
            <span onClick={this.onClick}>{this.state.x}</span>
            <span>{this.state.y}</span>
        </div>;
    }

}

export const Blackjack = () => {

    const [g, setG] = useState(Game.mk({shuffle: true}));

    const onAction: OnAction = useCallback((action: Action) => {
        const updater = (prevState: Game) => updateGame(prevState, action);
        setG(updater);
    }, [setG]);


    return <BlackjackVu g={g} onAction={onAction}/>;
};


