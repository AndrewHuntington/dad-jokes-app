import React, { Component } from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  min-width: 20%;
  margin: 0;
  padding: 1em 1em;
`;

const Rank = styled.span`
  display: inline-block;
  text-align: center;
  margin: 0 0.5em;

  .Ranker-votes {
    box-shadow: 10px 10px 14px -3px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 10px 10px 14px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 14px -3px rgba(0, 0, 0, 0.75);

    border: 3px solid red;
    border-radius: 50%;
    line-height: 50px;
    width: 50px;
    height: 50px;

    font-weight: 300;
    font-size: 1.2em;
  }
`;

export default class Ranker extends Component {
  constructor(props) {
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  getColor() {
    if (this.props.rank >= 15) {
      return "lime";
    } else if (this.props.rank >= 10) {
      return "yellowgreen";
    } else if (this.props.rank >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  handleUpVote() {
    this.props.vote(this.props.id, "up");
  }

  handleDownVote() {
    this.props.vote(this.props.id, "down");
  }

  render() {
    return (
      <Wrapper className="Ranker">
        <i className="fas fa-arrow-up" onClick={this.handleUpVote}></i>
        <Rank>
          <p className="Ranker-votes" style={{ borderColor: this.getColor() }}>
            {this.props.rank}
          </p>
        </Rank>
        <i className="fas fa-arrow-down" onClick={this.handleDownVote}></i>
      </Wrapper>
    );
  }
}
