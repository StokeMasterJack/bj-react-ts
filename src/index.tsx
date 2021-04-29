import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {User} from './user';
import {UserContext} from './common';


const user: User = {
    id: 33,
    firstName: 'Dave',
    lastName: 'Ford'
};

const renderToDom = (location: Location) => {
    const pathname = location.pathname;
    const ui = (
        <UserContext.Provider value={user}>
            <App path={pathname}/>
        </UserContext.Provider>
    );

    ReactDOM.render(ui, document.getElementById('root'));
};

renderToDom(window.location);

window.addEventListener('popstate', () => {
    renderToDom(window.location);
});
