import React from "react";
import {Blackjack} from "BlackjackUI";
import {RefsDemo} from "RefsDemo";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Job} from "Job";

type TabKey = "/" | "/bj" | "/refs" | "/job";

const App = ({path}: { path: string }) => {

    const tab = path as TabKey;

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
            case "/job":
                return <Job id={360123}/>;
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
        <Tab value={"/job"} label="Job"/>
    </Tabs>;
};

export default App;
