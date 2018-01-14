import React, { Component } from 'react'
const path = require('path')
import { Link } from 'react-router-dom'
const Store = require('electron-store')
const store = new Store()

import { readImgFiles } from '../sutils.js'

let pageStyle;
let pagesNamesArray;
let currDir;
let libraryPath = store.get("libraryPath");
let title;
let volume;
let pageCount;

export default class ContentPage extends Component {

    constructor(props) {
        super(props);
        title = this.props.match.params.title;
        volume = this.props.match.params.volume;
        currDir = path.join(libraryPath, title, volume);
        pagesNamesArray = readImgFiles(currDir);
        pageCount = pagesNamesArray.length-1;
        this.state = {
            pageNumber: 1,
            pageFilePath: path.join(currDir, pagesNamesArray[1]).replace(/\\/g, "/")
        };

        $(window).keydown((e) => {
            switch(e.keyCode) {
                case 37: this.updatePageState(-1)
                    break;
                case 39: this.updatePageState(1);
                    break;
            }
        });

    }

    componentDidMount() {
        var curDown = false,
            curX = 0,
            progressBarWidth = $(".progress-bar-container").width();
        $(".progress-bar-container").click((e) => {
            var newpn = Math.floor(pageCount*e.offsetX / progressBarWidth);
            console.log(newpn);
            this.setState({
                pageNumber: newpn,
                pageFilePath: path.join(currDir, pagesNamesArray[newpn]).replace(/\\/g, "/")
            });
            curDown = false;
        });
        $(".progress-bar-container").mousedown((e) => {
            curDown = true;
            curX = e.offsetX;
        });
        $(".progress-bar-container").mousemove((e) => {
            if(curDown) {
                var newpn = Math.floor(pageCount*e.offsetX / progressBarWidth);
                this.setState({
                    pageNumber: newpn,
                    pageFilePath: path.join(currDir, pagesNamesArray[newpn]).replace(/\\/g, "/")
                });
            }
        });
        $(window).mouseup(() => {
            curDown = false;
        });
    }

    updatePageState(pageChange) {
        if((this.state.pageNumber == 1 && pageChange == -1) || (this.state.pageNumber == pagesNamesArray.length-1 && pageChange == 1)) {
            console.log("first/last page");
        } else {
            this.setState({
                pageNumber: this.state.pageNumber+pageChange,
                pageFilePath: path.join(currDir, pagesNamesArray[this.state.pageNumber+pageChange]).replace(/\\/g, "/")
            });
        }
    }

    render() {
        return (
        <div className="page-container">
            <Link to={`/card/${title}`} className="back-button no-select">{'<'}  Back</Link>
            <div className="page-title no-select">{title}</div>
            <div className="volume-title no-select">{volume}</div>
            <div className="page-counter no-select">{this.state.pageNumber}/{pageCount}</div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${100*this.state.pageNumber / pageCount}%`}}></div>
            </div>
            <div className="home-button no-select">Home</div>
            <div className="page-image-container no-select">
                <img className="page-image" src={this.state.pageFilePath}/>
            </div>
        </div>
        )
    }
}
