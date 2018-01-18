import React, { Component } from 'react'
const remote = require('electron').remote
const Store = require('electron-store')
const store = new Store();
import SuSidebar from './Susidebar.jsx'

export default class SettingsPage extends Component {
  constructor() {
    super();
  }

  clearStorage() {
    store.clear();
    alert("cleared");
    remote.getCurrentWindow().reload();
  }

  render() {
    return (
      <div>
        <SuSidebar/>
        <button className="clear-storage-btn" onClick={this.clearStorage.bind(this)}>Clear Storage</button>
      </div>
    )
  }
}
