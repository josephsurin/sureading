import React, { Component } from 'react'

let bgStyle;

export default class CardComponent extends Component {
    constructor(props) {
        super(props);
        if(this.props.cover) {
            var fixedCover = this.props.cover.replace(/\\/g, "/");
            console.log(fixedCover);
            bgStyle = {
                backgroundImage: "url('"+fixedCover+"')"
            }
        } else {
            bgStyle = {
                backgroundImage: "red"
            }
        }
    }

  render() {
    return (
      <div className="card-container">
        <div className="card-image" style={bgStyle}>hey</div>
        <div className="card-title">{this.props.title}</div>
      </div>
    )
  }
}
