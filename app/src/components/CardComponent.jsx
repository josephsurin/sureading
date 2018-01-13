import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

let bgStyle;

export default class CardComponent extends Component {
    constructor(props) {
        super(props);
        if(this.props.cover) {
            var fixedCover = this.props.cover.replace(/\\/g, "/");
            bgStyle = {
                backgroundImage: "url('"+fixedCover+"')"
            }
        } else {
            bgStyle = {
                background: "grey"
            }
        }
    }

  render() {
    return (
        <NavLink to={`/card/${this.props.title}`}>
            <div className="card-container">
                <div className="card-image" style={bgStyle}></div>
                <div className="card-title">{this.props.title}</div>
            </div>
        </NavLink>
    )
  }
}
