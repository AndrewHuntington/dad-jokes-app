import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components/macro";

/**
 * TODO:
 * -Separate components into own classes
 * -Add smilies to the end of joke lis
 * -Style
 */

const API_URL = "https://icanhazdadjoke.com/";

const LoadingIcon = styled.i`
  font-size: 3rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.5);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`;

const Container = styled.div`
  border: 1px solid orange;
  display: flex;
  height: 600px;
  width: 75%;
`;

const SideBar = styled.div`
  border: 1px solid black;
  width: 30%;
  height: 100%;
`;

const ScrollList = styled.div`
  border: 1px solid purple;
  margin: auto 0;
  width: 70%;
  height: 70%;
  overflow-x: scroll;
`;

export default class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoaded: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    try {
      this.getJokes();
    } catch (err) {
      console.error(err);
    }
  }

  async getJokes() {
    for (let i = 0; i < 10; i++) {
      const response = await axios.get(`${API_URL}`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "https://andrewhuntington.github.io/dad-jokes-app/",
        },
      });

      const { id, joke, status, rank = 0 } = response.data;
      if (status !== 200) throw new Error(`Status: ${status}`);

      let flag = this.checkForDuplicateJokes(id);
      if (flag) {
        i--;
        flag = false;
      } else {
        this.setState((st) => ({ jokes: [...st.jokes, { id, joke, rank }] }));
      }
    }

    this.confirmLoaded();
  }

  confirmLoaded() {
    this.setState({ isLoaded: true });
  }

  // Check that all ids in this.state.jokes are unique
  // If a duplicate is found, it must make another request for a new joke
  checkForDuplicateJokes(id) {
    for (const joke of this.state.jokes) {
      if (id === joke.id) return true;
    }
    return false;
  }

  handleClick() {
    this.getJokes();
  }

  vote(id, direction) {
    const joke = this.state.jokes.filter((j) => j.id === id)[0];
    direction === "up" ? (joke.rank += 1) : (joke.rank -= 1);
    this.setState((st) => ({ jokes: [...st.jokes] }));
  }

  render() {
    // Uses lodash to sort components by their rank (vote totals)
    const jokes = _.sortBy(this.state.jokes, ["rank"])
      .map((j) => (
        <Joke
          id={j.id}
          text={j.joke}
          key={j.id}
          rank={j.rank}
          vote={this.vote}
        ></Joke>
      ))
      .reverse();

    return (
      <>
        {this.state.isLoaded ? (
          <Container>
            <SideBar>
              <h1>Dad Jokes</h1>
              <button onClick={this.handleClick}>New Jokes!</button>
            </SideBar>

            <ScrollList>
              <ul>{jokes}</ul>
            </ScrollList>
          </Container>
        ) : (
          <>
            <h2>Loading...</h2>
            <LoadingIcon className="far fa-grin-squint-tears"></LoadingIcon>
          </>
        )}
      </>
    );
  }
}
