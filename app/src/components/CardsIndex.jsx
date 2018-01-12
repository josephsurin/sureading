import React, { Component } from 'react';
const fs = require('fs');
const path = require('path');
const Store = require('electron-store');
const store = new Store();
const COVER_SYNTAX = /coverr/;
let cardsObject = {};
let cardComponentsArray = [];

import CardComponent from './CardComponent.jsx'

export default class CardsIndex extends Component { 
    constructor(props) {
        super(props);
        var libraryPath = store.get("libraryPath");
        this.createCardsFromDir(libraryPath);
    }

    createCardsFromDir(dirPath) {
        let subdirs = fs.readdirSync(dirPath).filter((f)=>fs.statSync(path.join(dirPath, f)).isDirectory());
        subdirs.forEach((el, i) => {
            var cover = fs.readdirSync(path.join(dirPath,el)).filter((f)=>f.match(COVER_SYNTAX));
            let coverPath;
            if(cover.length==1) {
                coverPath = path.join(dirPath,el,cover[0]);
            } else {
                coverPath = null;
            }
            cardsObject[el] = {
                "index": i,
                "coverPath": coverPath
            }
            cardComponentsArray.push(<CardComponent title={el} cover={coverPath} key={i}/>);
        });
        return cardComponentsArray;
    }

    render() {
        console.log(cardComponentsArray);
        return (
            <div className="wrapper-cards-index">
                {cardComponentsArray}
            </div>
        );
    }
}