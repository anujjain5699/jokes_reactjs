import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css'
import Joke from './Joke'
import { v4 as uuid } from 'uuid';

export default class JokeList extends Component {

    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            jokes: JSON.parse(window.localStorage.getItem('jokes') || "[]")
        }
        this.seenJokes = new Set(this.state.jokes.map(joke => joke.text));
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }

    async getJokes() {
        try {
            //load jokes
            //make temporary array bcuz instead of caling setState after every joke
            //we push all jokes in main state after that
            let jokes = [];
            if (this.state.jokes.length === 0) console.log("waiting")
            while (jokes.length < this.props.numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com/", {
                    headers: { Accept: 'application/json' }
                })
                let newJoke = res.data.joke;
                // console.log(res.data)
                if (!this.seenJokes.has(newJoke)) {
                    jokes.push({
                        id: uuid(),
                        text: newJoke,
                        votes: 0
                    })
                } else {
                    console.log("Found Duplicate")
                }

            }
            this.setState(st => ({
                loading: false,
                // jokes: [...st.jokes, ...jokes]
                // jokes: this.state.jokes.unshift(jokes)
                jokes: jokes.concat(st.jokes)
            }),
                () => window.localStorage.setItem(
                    "jokes", JSON.stringify(this.state.jokes)
                ))
            console.log(this.state.jokes);
        } catch (e) {
            console.log(e);
            alert(e);
            this.setState({ loading: false });
        }
    }

    handleClick() {
        this.setState({ loading: true }, this.getJokes);
    }

    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j)
        }),
            () => window.localStorage.setItem(
                "jokes", JSON.stringify(this.state.jokes)
            )
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            );
        }
        else {
            return <div className='JokeList'>
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="smily" />
                    <button className="JokeList-button" onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className='JokeList-jokes'>
                    {this.state.jokes.map(joke => (
                        <Joke
                            key={joke.id}
                            votes={joke.votes}
                            text={joke.text}
                            upvote={() => this.handleVote(joke.id, 1)}
                            downvote={() => this.handleVote(joke.id, -1)}
                        />
                    ))}
                </div>
            </div>;
        }

    }
}
