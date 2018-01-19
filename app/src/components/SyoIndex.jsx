import React, { Component } from 'react'
const Store = require('electron-store')
const store = new Store()
import { createCardsFromDir, addSpacerCards } from '../sutils.js'
import SuSidebar from './Susidebar.jsx'
import FirstLaunch from './FirstLaunch.jsx'

export default class SyoIndex extends Component {
  constructor() {
    super();
    var syolibraryPath = store.get("syolibraryPath");
    if(syolibraryPath) {
      this.state = {
        cardComponentsArray: createCardsFromDir(syolibraryPath, "cardSyo")
      }
    }
  }

  render() {
    if(!store.get("syolibraryPath")) {
      return <FirstLaunch library="syolibraryPath" colour="purple"/>
    } else {
      return (
        <div>
          <SuSidebar/>
          <div className="wrapper-cards">
            {this.state.cardComponentsArray}
          </div>
        </div>
      )
    }
  }
}
