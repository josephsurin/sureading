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
            cardComponentsArray: createCardsFromDir(libraryPath)
        }
        $(window).resize(() => {
            this.setState({
                cardComponentsArray: addSpacerCards(this.state.cardComponentsArray)
            })
        });
    }

    componentWillMount() {
        this.setState({
            cardComponentsArray: addSpacerCards(this.state.cardComponentsArray)
        });
    }

    render() {
        return (
            <div className="wrapper-cards-index">
                {this.state.cardComponentsArray}
            </div>
        );
    }
}