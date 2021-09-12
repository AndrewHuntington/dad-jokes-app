import React, { Component } from "react";
import Ranker from "./Ranker";
import styled from "styled-components/macro";
import "animate.css";

const LI = styled.li`
  display: flex;
  align-items: center;

  color: rgba(0, 0, 0, 0.7);
  background-color: white;
  border: 1px solid lightgrey;
  list-style-type: none;
`;

const Text = styled.span`
  font-size: 0.75rem;
  padding: 0.5em;
  text-align: left;
  margin: 0;
  min-width: 65%;
  line-height: 1.5em;
`;

const EmojiArea = styled.div`
  display: flex;
  justify-content: center;
  min-width: 15%;

  .em-svg {
    transform: scale(3.5);
    height: 1rem;
    width: 1rem;
    margin: 0;
    padding: 0;
  }

  :hover {
    animation: swing;
    animation-duration: 1s;
  }
`;

export default class Joke extends Component {
  getEmoji() {
    if (this.props.rank >= 15) {
      return "em-svg em-rolling_on_the_floor_laughing";
    } else if (this.props.rank >= 10) {
      return "em-svg em-face_with_hand_over_mouth";
    } else if (this.props.rank >= 5) {
      return "em-svg em-face_with_rolling_eyes";
    } else {
      return "em-svg em-angry";
    }
  }

  render() {
    return (
      <LI id={this.props.id} rank={this.props.rank}>
        <Ranker
          rank={this.props.rank}
          vote={this.props.vote}
          id={this.props.id}
        />
        <Text>{this.props.text}</Text>
        <EmojiArea>
          <i class={this.getEmoji()}></i>
        </EmojiArea>
      </LI>
    );
  }
}
