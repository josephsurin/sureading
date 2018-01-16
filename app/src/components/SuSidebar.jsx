import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
const path = require('path')
const Store = require('electron-store')
const store = new Store()
var drag = require('electron-drag');
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
        var clear = drag('#su-control');
        
    }

    render() {
        return (
            <div className="su-sidebar-wrapper">
                <div className="su-sidebar">
                <div className="su-control-buttons no-select" id="su-control">hey</div>
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
