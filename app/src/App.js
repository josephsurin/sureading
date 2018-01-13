import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const electron = require('electron');
const ipc = electron.ipcRenderer;
const dialog = electron.remote.dialog;

const Store = require('electron-store');
const store = new Store();

window.$ = window.jQuery = require('jquery');

require("./styles/main.sass");

import FirstLaunch from './components/FirstLaunch.jsx';
import CardsIndex from './components/CardsIndex.jsx';
import VolsIndex from './components/VolsIndex.jsx';

let content;

if(!store.get("libraryPath")) {
    content = <FirstLaunch/>
} else {
    content = (
        <Router>
            <div>
                <Route exact path="" component={CardsIndex}/>
                <Route path="/card" component={VolsIndex}/>
            </div>
        </Router>
    );
}

export default class App extends Component {
    constructor() {
        super();
    }
    render() {
        return(content);
    }

}
