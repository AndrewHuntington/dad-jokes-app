import React, { Component } from "react";
import styled from "styled-components/macro";

const Wrapper = styled.span`
  border: 1px solid blue;
`;

export default class Ranker extends Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote() {
    this.props.vote(this.props.id, "up");
  }

  handleDownVote() {
    this.props.vote(this.props.id, "down");
  }

  render() {
    return (
      <Wrapper>
        <i className="fas fa-arrow-up" onClick={this.handleUpVote}></i>
        {this.props.rank}
        <i className="fas fa-arrow-down" onClick={this.handleDownVote}></i>
      </Wrapper>
    );
  }
}
