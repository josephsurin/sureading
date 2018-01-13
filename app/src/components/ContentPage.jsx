import React, { Component } from 'react'
const path = require('path')
const Store = require('electron-store')
const store = new Store()

import { readImgFiles } from '../sutils.js'

let pageStyle;
let pagesNamesArray;
let currDir;

export default class ContentPage extends Component {

    constructor(props) {
        super(props);
        currDir = path.join(store.get("libraryPath"),this.props.match.params.title, this.props.match.params.volume);
        pagesNamesArray = readImgFiles(currDir);
        console.log(pagesNamesArray);
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
        <div className="page-image" style={ { backgroundImage: `url('${this.state.pageFilePath}')`} }>
            {this.state.pageNumber}
        </div>
        )
    }
}
