import React, { Component } from 'react';
const remote = require('electron').remote;
const dialog = remote.dialog;
const Store = require('electron-store');
const store = new Store();

const ipcRenderer = require('electron').ipcRenderer;
import SuSidebar from './Susidebar.jsx'

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
                store.set(`${this.props.library}`, path[0]);
                this.setState({
                    libraryPathSet: true
                }, () => $(".goto-cards").removeClass("su-disabled"));
            }
        });
    }

    gotoCards() {
        console.log("Hey");
        remote.getCurrentWindow().reload();
    }

    render() {
        return (
            <div>
                <SuSidebar/>            
                <div className="wrapper-launch">
                    <button className={`select-directory-button su-primary-button ${this.props.colour}`} onClick={this.selectLibraryDirectoryDialog.bind(this)}>Select Library Folder</button>
                    <button className={`goto-cards su-circle-button su-disabled btn${this.props.colour}`}><i className="fa fa-arrow-right" onClick={this.gotoCards.bind(this)}></i></button>
                </div>
            </div>
        );
    }
}