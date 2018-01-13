import React, { Component } from 'react';
const fs = require('fs');
const path = require('path');

import CardComponent from './components/CardComponent.jsx'

export function createCardsFromDir(dirPath) {
    const COVER_SYNTAX = /coverr/;
    let cardsObject = {};

    var tempCardsArray = [];
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
        tempCardsArray.push(<CardComponent title={el} cover={coverPath} key={i}/>);
    });
    return tempCardsArray;
}

export function addSpacerCards(stateCardsArray) {
    const cardWidth = 250;
    var numberOfCardsInRow = window.innerWidth / cardWidth<Math.floor(window.innerWidth / cardWidth)+0.068 ? Math.floor(window.innerWidth / cardWidth)-1 : Math.floor(window.innerWidth / cardWidth);       //magic
    var tempCardsArray1 = stateCardsArray;
    tempCardsArray1=tempCardsArray1.filter((el)=> {
        return !(/su-invisible/.test(el.props.className))
    }); 
    if(tempCardsArray1.length%numberOfCardsInRow!==0) {
        var requiredExtras = numberOfCardsInRow-(tempCardsArray1.length % numberOfCardsInRow);
        for(var i = 0; i < requiredExtras; i++) {
            tempCardsArray1.push(<div className="card-container su-invisible"/>);
        }
    }
    return tempCardsArray1;
}
