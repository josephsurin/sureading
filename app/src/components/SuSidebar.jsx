import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const path = require('path')
const Store = require('electron-store')
const store = new Store()

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
    }

    render() {
        return (
            <div className="su-sidebar">
                <Link to={this.state.linkto}>
                    <div className="continue-reading">
                        <div className="continue-reading-img" style={{
                            backgroundImage: `url('${this.state.lastreadCover}')`
                        }}/>
                        <span className="lastread-title">{this.state.lastreadTitle}<br></br></span>
                        <span className="lastread-vol">{this.state.lastreadVol}<br></br></span>
                        <span className="lastread-page">Page: {this.state.lastreadPage}</span>
                    </div>
                </Link>
            </div>
        )
    }
}
