import React, { Component } from 'react';
const fs = require('fs');
const path = require('path');
window.$ = window.jQuery = require('jquery');
const Store = require('electron-store');
const store = new Store();

import { createCardsFromDir, addSpacerCards } from '../sutils.js';


export default class CardsIndex extends Component { 
    constructor(props) {
        super(props);
        var libraryPath = store.get("libraryPath");
        this.state = {
            cardComponentsArray: createCardsFromDir(libraryPath, "card")
        }
    }


    render() {
        return (
            <div className="wrapper-cards">
                {this.state.cardComponentsArray}
            </div>
        );
    }
}