import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
const remote = require('electron').remote;
const path = require('path')
const Store = require('electron-store')
const store = new Store()

window.$ = window.jQuery = require('jquery')

import { getCoverImgPath } from '../sutils.js'

var globalLastRead = store.get("globalLastRead");

export default class SuSidebar extends Component {
    constructor() {
        super();
        if(globalLastRead) {
            this.state = {
                lastreadTitle: globalLastRead.split('/')[1],
                lastreadVol: globalLastRead.split('/')[2],
                lastreadPage: globalLastRead.split('/')[3],
                lastreadCover: getCoverImgPath(path.join(store.get("libraryPath"),`/${globalLastRead.split('/')[1]}/${globalLastRead.split('/')[2]}`)).replace(/\\/g, "/"),
                linkto: `/card/${globalLastRead.split('/')[1]}/vol/${globalLastRead.split('/')[2]}`
            }
        }
    }

    componentDidMount() {
        if(globalLastRead!=store.get("globalLastRead")) {
            globalLastRead = store.get("globalLastRead");
            this.setState({
                lastreadTitle: globalLastRead.split('/')[1],
                lastreadVol: globalLastRead.split('/')[2],
                lastreadPage: globalLastRead.split('/')[3],
                lastreadCover: getCoverImgPath(path.join(store.get("libraryPath"),`/${globalLastRead.split('/')[1]}/${globalLastRead.split('/')[2]}`)).replace(/\\/g, "/"),
                linkto: `/card/${globalLastRead.split('/')[1]}/vol/${globalLastRead.split('/')[2]}`
            });
        }
        var win = remote.getCurrentWindow();
        var isMaxed = win.isMaximized;
        $(".su-control-close").click(() => {
            win.close();
        });
        $(".su-control-max").click(() => {
            if(isMaxed) {
                win.unmaximize();
            } else {
                win.maximize();
            }
            isMaxed = !isMaxed;
        });
        $(".su-control-min").click(() => {
            win.minimize();
        });
    }

    render() {
        return (
            <div className="su-sidebar-wrapper">
                <div className="su-sidebar">
                <div className="su-control-area no-select" id="su-control">
                    <div className="su-control-close su-control-button"></div>
                    <div className="su-control-max su-control-button"></div>
                    <div className="su-control-min su-control-button"></div>
                    <div className="su-title">sureading 3.0</div>
                </div>
                    <Link to={this.state.linkto}>
                        <div className="continue-reading no-select">
                            <div className="continue-reading-img no-select" style={{
                                backgroundImage: `url('${this.state.lastreadCover}')`
                            }}/>
                            <span className="lastread-title no-select">{this.state.lastreadTitle}<br></br></span>
                            <span className="lastread-vol no-select">{this.state.lastreadVol}<br></br></span>
                            <span className="lastread-page no-select">Page: {this.state.lastreadPage}</span>
                        </div>
                    </Link>
                    <NavLink exact to="/" className="sidebar-link-home no-select" activeClassName="sidebar-link-home-active">sureading</NavLink>
                    <NavLink to="/syo" className="sidebar-link-syo no-select" activeClassName="sidebar-link-syo-active">syosetsu</NavLink>
                    <NavLink to="/settings" className="sidebar-link-settings no-select" activeClassName="sidebar-link-settings-active">settings</NavLink>
            </div>
        </div>
        )
    }
}
