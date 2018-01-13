import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const path = require('path');
window.$ = window.jQuery = require('jquery');
const Store = require('electron-store');
const store = new Store();

import { createCardsFromDir, addSpacerCards } from '../sutils.js';

export default class VolsIndex extends Component {
    constructor(props) {
        super(props);
        var cardFolderPath = path.join(store.get("libraryPath"), this.props.match.params.title);
        this.state = {
            volCardComponentsArray: [
                <Link to=""><div className="card-container card-back"/></Link>, 
                ...createCardsFromDir(cardFolderPath, "vol")]
        }
    }

  render() {
    return (
      <div className="wrapper-cards">
        {this.state.volCardComponentsArray}
      </div>
    )
  }
}
