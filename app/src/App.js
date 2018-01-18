import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Link, HashRouter } from 'react-router-dom'

const electron = require('electron')
import { remote } from 'electron'
const ipc = electron.ipcRenderer
const dialog = electron.remote.dialog

const Store = require('electron-store')
const store = new Store()


window.$ = window.jQuery = require('jquery')

require("./styles/main.sass")


import CardsIndex from './components/CardsIndex.jsx'
import VolsIndex from './components/VolsIndex.jsx'
import ContentPage from './components/ContentPage.jsx'
import SyoIndex from './components/SyoIndex.jsx'
import SettingsPage from './components/SettingsPage.jsx'

let content;

    content = (
        <HashRouter>
            <div className="router-div">
                <Route exact path="/" component={CardsIndex}/>
                <Route exact path="/card/:title" component={VolsIndex}/>
                <Route exact path="/card/:title/vol/:volume" component={ContentPage}/>
                <Route exact path="/syo" component={SyoIndex}/>
                <Route exact path="/settings" component={SettingsPage}/>
            </div>
        </HashRouter>
    );

export default class App extends Component {
    constructor() {
        super();
    }
    render() {
        return(content);
    }

}
