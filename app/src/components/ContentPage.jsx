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
let zoomedIn = false;
let bookmarkName;

export default class ContentPage extends Component {

    constructor(props) {
        super(props);
        title = this.props.match.params.title;
        volume = this.props.match.params.volume;
        bookmarkName = `bookmark/${title}/${volume}`
        currDir = path.join(libraryPath, title, volume);
        pagesNamesArray = readImgFiles(currDir);
        pageCount = pagesNamesArray.length-1;
        this.state = {
            pageNumber: 1,
            pageFilePath: path.join(currDir, pagesNamesArray[1]).replace(/\\/g, "/")
        };

        $(window).keydown((e) => {
            switch(e.keyCode) {
                case 37: 
                    e.preventDefault();
                    this.updatePageState(-1);
                    break;
                case 39: 
                    e.preventDefault();
                    this.updatePageState(1);
                    break;
                case 13: e.preventDefault(); break;
            }
        });

    }

    componentWillMount() {
        zoomedIn = false;
        if(store.get(bookmarkName)) {
            this.setState({
                pageNumber: store.get(bookmarkName)
            });
        }
    }

    componentDidMount() {
        var curDown = false,
            curX = 0,
            progressBarWidth = $(".progress-bar-container").width();
        $(".progress-bar-container").click((e) => {
            var newpn = Math.ceil(pageCount*e.offsetX / progressBarWidth);
            newpn === 0 ? newpn=1 : newpn=newpn;
            newpn > pageCount ? newpn=pageCount : newpn=newpn;
            this.setState({
                pageNumber: newpn
            });
            curDown = false;
        });
        $(".progress-bar-container").mousedown((e) => {
            curDown = true;
            curX = e.offsetX;
        });
        $(".progress-bar-container").mousemove((e) => {
            if(curDown) {
                var newpn = Math.ceil(pageCount*e.offsetX / progressBarWidth);
                newpn === 0 ? newpn=1 : newpn=newpn;
                newpn > pageCount ? newpn=pageCount : newpn=newpn;
                this.setState({
                    pageNumber: newpn
                });
            }
        });
        $(window).mouseup(() => {
            curDown = false;
        });

        $(".page-counter-pagenum").keydown((e) => {
            if($(".page-counter-pagenum").text().length>=pageCount.toString().length+1 && e.keyCode != 8 && e.keyCode!=46 && e.keyCode!=37 && e.keyCode!=39 && e.keyCode!=13) {
                e.preventDefault();
                return false;
            } else if(e.keyCode==13) {
                this.checkAndGotoPage();
            }
        });

        $(".page-image").click(function() {
            $(this).css("height" , zoomedIn ? "94.5vh" : "175vh");
            zoomedIn = !zoomedIn;
        });

        $(".go-next").click(() => {
            this.updatePageState(1);
        });

        $(".go-prev").click(() => {
            this.updatePageState(-1);
        });

        $(".bookmark").click(() => {
            store.set(bookmarkName, this.state.pageNumber);
            store.set("globalLastRead", `${bookmarkName}/${this.state.pageNumber}`);
            $(".bookmark").addClass("su-disabled");
            setTimeout(()=>{$(".bookmark").removeClass("su-disabled")}, 1200);
            $(".bookmark").fadeOut(300, function() {
                $(this).removeClass("fa-bookmark").addClass("fa-check");
            }).fadeIn(300);

            
            $(".bookmark").fadeOut(300, function() {
                $(this).removeClass("fa-check").addClass("fa-bookmark");
            }).fadeIn(300);
        });

        $(".del-bookmark").click(() => {
            if(store.get(bookmarkName)) {
                store.delete(bookmarkName);
                $(".del-bookmark").fadeOut(300, function() {
                    $(this).removeClass("fa-trash").addClass("fa-check");
                }).fadeIn(300);
    
                
                $(".del-bookmark").fadeOut(300, function() {
                    $(this).removeClass("fa-check").addClass("fa-trash");
                }).fadeIn(300);
            }

        });

    }

    checkAndGotoPage() {
        var pcpn = $(".page-counter-pagenum");
        var newInput = parseInt(pcpn.text());
        if(newInput > 0 && newInput <= pageCount) {
            pcpn.css("borderColor", "#96baba");
            this.setState({
                pageNumber: newInput
            });
            pcpn.blur();
        } else {
            pcpn.css("borderColor", "red");
        }
    }

    updatePageState(pageChange) {
        if(!$(".page-counter-pagenum").is(":focus")) {
            if((this.state.pageNumber == 1 && pageChange == -1) || (this.state.pageNumber == pagesNamesArray.length-1 && pageChange == 1)) {
                console.log("first/last page");
            } else {
                this.setState({
                    pageNumber: this.state.pageNumber+pageChange
                });
            }
        }
        $(window).scrollTop(0);
    }

    render() {
        return (
            <div className="page-container">
                <div className="left-page-container">
                    <Link to={`/card/${title}`} className="back-button no-select">{'<'}  Back</Link>
                    <div className="page-title no-select">{title}</div>
                    <div className="volume-title no-select">{volume}</div>
                    <div className="page-counter no-select"><span contentEditable="true" className="page-counter-pagenum">{this.state.pageNumber}</span>/{pageCount}</div>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${100*this.state.pageNumber / pageCount}%`}}></div>
                    </div>
                    <div className="home-button-container">
                        <Link to="/" className='home-button no-select'>Home</Link>
                    </div>
                </div>
                <div className="page-image-container no-select">
                    <img className="page-image" alt="error/unsupported file format" src={path.join(currDir, pagesNamesArray[this.state.pageNumber]).replace(/\\/g, "/")}/>
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
