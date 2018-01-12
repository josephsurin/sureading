import React, { Component } from 'react';
import { render } from 'react-dom';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const dialog = electron.remote.dialog;

const Store = require('electron-store');
const store = new Store();

window.$ = window.jQuery = require('jquery');

require("./styles/main.sass");

import FirstLaunch from './components/FirstLaunch.jsx';
import CardsIndex from './components/CardsIndex.jsx';

let content;

if(!store.get("libraryPath")) {
    content = <FirstLaunch/>
} else {
    console.log(store.get("libraryPath"));
    content = <CardsIndex/>
}

export default class App extends Component {
    constructor() {
        super();
    }
    render() {
        return(content);
    }

}
