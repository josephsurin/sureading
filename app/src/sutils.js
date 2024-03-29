import React, { Component } from 'react';
const fs = require('fs');
const path = require('path');
const naturalSort = require('javascript-natural-sort');
window.$ = window.jQuery = require('jquery');

const imgRegTest = /(\.jpg|\.png|\.jpeg|\.tiff|\.bmp|\.tif)/i;
const COVER_SYNTAX = /cover/;

import CardComponent from './components/CardComponent.jsx'

export function createCardsFromDir(dirPath, type) {
    let cardsObject = {};
    var tempCardsArray = [];
    let subdirs = subDirs(dirPath)
    subdirs.forEach((el, i) => {
        var coverPath = getCoverImgPath(path.join(dirPath, el));
        cardsObject[el] = {
            "index": i,
            "coverPath": coverPath,
            "type": type
        }
        if(type=="cardSyo") {
            var syotitle;
            var syoInfoFile = path.join(dirPath, el, `${el}.html`);
            $.get({
                url: syoInfoFile,
                success: gotTitles,
                async: false
            });
            function gotTitles(data) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(data, 'text/html');
                syotitle = doc.getElementsByClassName('novel_title')[0].innerText;
                tempCardsArray.push(<CardComponent title={syotitle} cover={coverPath} key={i} type={type} id={el}/>);   
            }
        } else {
        tempCardsArray.push(<CardComponent title={el} cover={coverPath} key={i} type={type}/>);
        }
    });
        return tempCardsArray;
}

export function readImgFiles(dirPath) {
    return ['0', ...fs.readdirSync(dirPath).filter(file=>imgRegTest.test(file)).sort(naturalSort)];
}

export function readHTMLFiles(dirPath) {
    return fs.readdirSync(dirPath).filter(file=>/.html$/.test(file)).sort(naturalSort);
}

export function getCoverImgPath(dir) {
    var cover = fs.readdirSync(dir).find((f) => COVER_SYNTAX.test(f)) || fs.readdirSync(dir).find((f) => imgRegTest.test(f));
    if(cover) {
        return path.join(dir, cover);
    } else {
        var coverNext;
        subDirs(dir).some((el) => {
            coverNext = getCoverImgPath(path.join(dir, el));
            return coverNext;
        });
        return coverNext;
    }
}

export function subDirs(dirPath) {
    return fs.readdirSync(dirPath).filter((f)=>fs.statSync(path.join(dirPath, f)).isDirectory());
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
