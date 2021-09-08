import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import _ from "lodash";

const API_URL = "https://icanhazdadjoke.com/";

export default class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
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
      <div className="JokeList">
        <button onClick={this.handleClick}>Get more jokes!</button>
        <h1>Dad Jokes</h1>
        <ul>{jokes}</ul>
      </div>
    );
  }
}
