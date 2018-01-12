import React, { Component } from 'react';
const dialog = require('electron').remote.dialog;
const Store = require('electron-store');
const store = new Store();

window.$ = window.jQuery = require('jquery');


export default class FirstLaunch extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            libraryPathSet: false
        }
    }

    selectLibraryDirectoryDialog() {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }, (path) => {
            console.log(path);
            if(typeof path !== 'undefined') {
                store.set('libraryPath', path[0]);
                this.setState({
                    libraryPathSet: true
                }, () => $(".goto-cards").removeClass("su-disabled"));
            }
        });
    }

    gotoCards() {
        console.log(this.state.libraryPathSet);
        console.log("oh... path is set...?", store.get('libraryPath'));
    }

    render() {
        return (
            <div className="wrapper-launch">
                <button className="select-directory-button su-primary-button" onClick={this.selectLibraryDirectoryDialog.bind(this)}>Select Library Folder</button>
                <button className="goto-cards su-circle-button su-disabled"><i className="fa fa-arrow-right" onClick={this.gotoCards.bind(this)}></i></button>
            </div>

        );
    }
}