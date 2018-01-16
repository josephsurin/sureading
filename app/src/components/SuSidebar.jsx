import React, { Component } from 'react'
const path = require('path')
const Store = require('electron-store')
const store = new Store()

import { getCoverImgPath } from '../sutils.js'

export default class SuSidebar extends Component {
    constructor() {
        super();
        var globalLastRead = store.get("globalLastRead");
        var lastreadTitle = globalLastRead.split('/')[1];
        var lastreadVol = globalLastRead.split('/')[2];
        var lastreadPage = globalLastRead.split('/')[3];
        var lastreadCover = getCoverImgPath(path.join(store.get("libraryPath"),`/${lastreadTitle}/${lastreadVol}`));
    }
    render() {
        return (
            <div className="su-sidebar">
                <div className="continue-reading">

                </div>
            </div>
        )
    }
}
