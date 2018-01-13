import React, { Component } from 'react';
const fs = require('fs');
const path = require('path');

const imgRegTest = /(\.jpg|\.png|\.jpeg|\.tiff|\.bmp)/i;

import CardComponent from './components/CardComponent.jsx'

export function createCardsFromDir(dirPath, type) {
    const COVER_SYNTAX = /cover/;
    let cardsObject = {};

    var tempCardsArray = [];
    let subdirs = fs.readdirSync(dirPath).filter((f)=>fs.statSync(path.join(dirPath, f)).isDirectory());
    subdirs.forEach((el, i) => {
        var cover = fs.readdirSync(path.join(dirPath,el)).find((f)=>COVER_SYNTAX.test(f));
        let coverPath;
        if(cover) {
            coverPath = path.join(dirPath,el,cover);
        } else {
            var firstImage = fs.readdirSync(path.join(dirPath,el)).find(el1=>imgRegTest.test(path.extname(path.join(dirPath,el,el1))));
            if(firstImage) {
                coverPath = path.join(dirPath, el, firstImage);
            } else {
                coverPath = null;
            }
        }
        cardsObject[el] = {
            "index": i,
            "coverPath": coverPath,
            "type": type
        }
        tempCardsArray.push(<CardComponent title={el} cover={coverPath} key={i} type={type}/>);
    });
    return tempCardsArray;
}

export function readImgFiles(dirPath) {
    return ['0', ...fs.readdirSync(dirPath).filter(file=>imgRegTest.test(file))];
}

/* redundant
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
} */
