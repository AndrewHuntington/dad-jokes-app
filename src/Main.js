import React, { Component } from "react";
import Joke from "./Joke";
import "./Main.css";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components/macro";

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

export default class Main extends Component {
  constructor(props) {
    super(props);
    if (localStorage.jokes0811) {
      this.state = {
        jokes: JSON.parse(localStorage.jokes0811),
        isLoaded: true,
      };
    } else {
      this.state = {
        jokes: [],
        isLoaded: false,
      };
    }

    this.vote = this.vote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.isLoaded) return;

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
    localStorage.setItem("jokes0811", JSON.stringify(this.state.jokes));
  }

  handleClick() {
    this.getJokes();
  }

  // Check that all ids in this.state.jokes are unique
  // If a duplicate is found, it must make another request for a new joke
  checkForDuplicateJokes(id) {
    for (const joke of this.state.jokes) {
      if (id === joke.id) return true;
    }
    return false;
  }

  vote(id, direction) {
    const joke = this.state.jokes.filter((j) => j.id === id)[0];
    direction === "up" ? (joke.rank += 1) : (joke.rank -= 1);
    this.setState((st) => ({ jokes: [...st.jokes] }));
    localStorage.setItem("jokes0811", JSON.stringify(this.state.jokes));
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
          <div className="Main">
            <div className="Main-sidebar">
              <h1>
                Dad <span className="Main-thin-text">Jokes</span>
              </h1>
              <div className="Main-smiley">
                <i className="em-svg em-joy"></i>
              </div>

              <button className="Main-button" onClick={this.handleClick}>
                New Jokes
              </button>
            </div>

            <div className="Main-jokelist">
              <ul>{jokes}</ul>
            </div>
          </div>
        ) : (
          <div className="Main-loading">
            <h2>Loading...</h2>
            <LoadingIcon className="far fa-grin-squint-tears"></LoadingIcon>
          </div>
        )}
      </>
    );
  }
}
