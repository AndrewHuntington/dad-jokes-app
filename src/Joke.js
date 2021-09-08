import React, { Component } from "react";
import Ranker from "./Ranker";
import styled from "styled-components/macro";

const LI = styled.li`
  list-style-type: none;
  text-align: left;
  border: 1px solid red;
`;

export default class Joke extends Component {
  render() {
    return (
      <LI id={this.props.id} rank={this.props.rank}>
        <Ranker
          rank={this.props.rank}
          vote={this.props.vote}
          id={this.props.id}
        />
        {this.props.text}
      </LI>
    );
  }
}
