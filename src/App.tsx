import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import {Blackjack} from './bj/Blackjack';
import {Count} from './count/CountDemo';

type TabKey = '/' | '/bj' | '/count';

const App = ({path}: { path: string }) => {

    const tab = path as TabKey;

    const setTab = (tab: TabKey) => {
        window.history.pushState(null, '', tab);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };


    const body = () => {
        switch (tab) {
            case '/':
                return <h1>Home</h1>;
            case '/bj':
                return <Blackjack/>;
            case '/count':
                return <Count/>;
        }
    };

    return <div style={{display:'flex',flexDirection:'column',padding: '1rem',backgroundColor:'yellow',alignItems:'flex-start'}}>
        <div>
            <TabBar tab={tab} setTab={setTab}/>
        </div>
        <div style={{padding:'1rem'}}>
            {body()}
        </div>
    </div>;
};

const TabBar = ({tab, setTab}: { tab: TabKey, setTab: any }) => {

    return <Tabs value={tab} onChange={(e, value) => setTab(value)} width='200'>
        <Tab value={'/'} label="Home"/>
        <Tab value={'/bj'} label="Blackjack"/>
        <Tab value={'/count'} label="Count"/>
    </Tabs>;
};

export default App;
