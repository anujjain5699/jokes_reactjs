import React, { Component } from 'react';
import './Joke.css'

export default class Joke extends Component {

    getColor() {
        if (this.props.votes >= 15) {
            return "#0DFD15";
        } else if (this.props.votes >= 9) {
            return "#66B60AC7"
        } else if (this.props.votes >= 6) {
            return "#ECFF3E"
        } else if (this.props.votes >= 3) {
            return "#E09C0B"
        } else if (this.props.votes >= 0) {
            return "#FFC107"
        } else {
            return "#f44336"
        }
    }

    getEmoji() {
        if (this.props.votes >= 15) {
            return "em em-rolling_on_the_floor_laughing";
        } else if (this.props.votes >= 9) {
            return "em em-laughing";
        } else if (this.props.votes >= 6) {
            return "em em-smiley"
        } else if (this.props.votes >= 3) {
            return "em em-neutral_face";
        } else if (this.props.votes >= 0) {
            return "em em-confused"
        } else {
            return "em em-angry"
        }
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fa fa-arrow-up" onClick={this.props.upvote}></i>
                    <span className="Joke-votes" style={{ borderColor: this.getColor() }}>{this.props.votes}</span>
                    <i className="fa fa-arrow-down" onClick={this.props.downvote}></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
                <div className="Joke-smiley">
                    <i className={this.getEmoji()}></i>
                </div>
            </div>
        );
    }
}
