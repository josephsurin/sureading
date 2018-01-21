import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const path = require('path');
window.$ = window.jQuery = require('jquery');
const Store = require('electron-store');
const store = new Store();

import { readHTMLFiles } from '../sutils.js'

let currDirSyo;
let chaptersArray;
let mainFile;
let title;

export default class ChIndex extends Component {
    constructor(props) {
        super(props);
        var id = this.props.match.params.id;
        currDirSyo = path.join(store.get("syolibraryPath"), id);
        chaptersArray = readHTMLFiles(currDirSyo);
        mainFile = path.join(currDirSyo , `${id}.html`);

    }

    componentWillMount() {
        $.get(mainFile, (results) => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(results, "text/html");
            title = doc.getElementsByClassName("novel_title")[0].innerText;
        }).then(() => {
            this.forceUpdate();
        })
    }

    componentDidMount() {
        var syoframe = document.getElementById("syo-frame");
        $(syoframe).on('load', function() {
            var syodoc = syoframe.contentDocument;
            var chapterLinks = $(syodoc).find(".subtitle > a");
            for(var i = 0; i < chapterLinks.length; i++) {
                var newHref = './'+chapterLinks[i].getAttribute("href").split('/')[1]+chapterLinks[i].getAttribute("href").split('/')[2]+'.html'
                chapterLinks[i].setAttribute("href", newHref)
                console.log(chapterLinks[i])
            }
        })
    }

    render() {
        return (
            <div className="page-container">
            <div className="left-page-container">
                <Link to={`/syo`} className="back-button no-select">{'<'}  Back</Link>
                <div className="page-title no-select">{title}</div>
                <div className="volume-title no-select">hey</div>
                <div className="page-counter no-select"><span contentEditable="true" className="page-counter-pagenum">44</span>%</div>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '25px'}}></div>
                </div>
                <div className="home-button-container">
                    <Link to="/" className='home-button no-select'>Home</Link>
                </div>
            </div>
            <div className="page-image-container no-select">
                <iframe className="page-image syo-frame" id="syo-frame" sandbox="" src={mainFile}></iframe>
            </div>
            <div className="right-page-container">
            
                <i className="fa fa-bookmark bookmark control-button" title="Bookmark this page!"></i>                
                <i className="fa fa-trash del-bookmark control-button" title="Remove Bookmark"></i>
                <i className="fa fa-arrow-left go-prev control-button"></i>
                <i className="fa fa-arrow-right go-next control-button"></i>   

            </div>
        </div>
        )
    }
}
