import React from "react";
// import {useState} from "react";
import {Blackjack} from "BlackjackUI";
import {RefsDemo} from "RefsDemo";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

type TabKey = "/" | "/bj" | "/refs";

const App = ({path}: { path: string }) => {

    console.log("path: ", path);

    const tab = path as TabKey;

    console.log("tab: ", tab);

    const setTab = (tab: TabKey) => {
        window.history.pushState(null, "", tab);
        window.dispatchEvent(new PopStateEvent("popstate"));
    };

    const body = () => {
        switch (tab) {
            case "/":
                return <h1>Home</h1>;
            case "/bj":
                return <Blackjack/>;
            case "/refs":
                return <RefsDemo/>;
        }
    };

    return <div style={{padding: "1rem"}}>
        <div>
            <TabBar tab={tab} setTab={setTab}/>
        </div>
        <div>
            {body()}
        </div>
    </div>;
};

const TabBar = ({tab, setTab}: { tab: TabKey, setTab: any }) => {

    return <Tabs value={tab} onChange={(e, value) => setTab(value)}>
        <Tab value={"/"} label="Home"/>
        <Tab value={"/bj"} label="Blackjack"/>
        <Tab value={"/refs"} label="Refs"/>
    </Tabs>;
};

export default App;
