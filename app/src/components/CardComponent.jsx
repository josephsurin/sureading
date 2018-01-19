import React, { Component } from 'react'
import { Link } from 'react-router-dom'

let bgStyle;
let linkto;

export default class CardComponent extends Component {
    constructor(props) {
        super(props);
        if(this.props.cover) {
            var fixedCover = this.props.cover.replace(/\\/g, "/");
            bgStyle = {
                backgroundImage: `url("${fixedCover}")`
            }
        } else {
            bgStyle = {
                background: "grey"
            }
        }
        if(this.props.type=="card") {
            linkto=`/card/${this.props.title}`;
        } else if(this.props.type=="vol") {
            linkto=`${location.hash.substring(1)}/vol/${this.props.title}`;
        } else if(this.props.type=="cardSyo") {
            linkto=`/syo/${this.props.title}`;
        }
    }

  render() {
    return (
        <Link to={linkto}>
            <div className="card-container">
                <div className="card-image" style={bgStyle}></div>
                <div className="card-title">{this.props.title}</div>
            </div>
        </Link>
    )
  }
}
