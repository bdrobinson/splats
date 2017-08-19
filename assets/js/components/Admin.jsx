import React from 'react'
import styled from 'styled-components'

import IPCounting from './IPCounting.jsx'

const P = styled.p`margin: 0;`

const Results = ({ results }) => {
    if (results.length === 0) {
        return <p>No votes cast!</p>
    } else {
        return (
            <div>
                {results.map(result =>
                    <P key={result.name}>
                        {result.name} : {result.votes}
                    </P>
                )}
            </div>
        )
    }
}

export default class Admin extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            password: '',
            results: null,
            showPasswordError: false,
            shouldCountIps: null,
        }

        this.setPassword = this.setPassword.bind(this)
        this.getResults = this.getResults.bind(this)
        this.setSucceeded = this.setSucceeded.bind(this)
    }

    setPassword (e) {
        this.setState({ password: e.target.value })
    }

    async getResults () {
        const response = await fetch(
            `/api/results?password=${this.state.password}`
        )
        if (response.ok) {
            const json = await response.json()
            const sortedJson = json.sort((a, b) => b.votes - a.votes)
            this.setState({ results: sortedJson })
            this.setSucceeded(true)
        } else {
            this.setSucceeded(false)
        }
    }

    setSucceeded (success) {
        this.setState({ showPasswordError: !success })
    }

    render () {
        return (
            <div>
                <h1>Admin</h1>
                <section>
                    <label>
                        Enter password here:&nbsp;
                        <input
                            type='text'
                            value={this.state.password}
                            onChange={this.setPassword}
                        />
                    </label>
                    <br />
                    <span hidden={!this.state.showPasswordError}>
                        Incorrect password!
                    </span>
                </section>
                <section>
                    <h2>Results</h2>
                    <div>
                        {this.state.results != null &&
                            <Results results={this.state.results} />}
                    </div>
                    <button onClick={this.getResults}>Update results</button>
                </section>
                <section>
                    <h2>IP Counting</h2>
                    <IPCounting
                        password={this.state.password}
                        afterRequest={this.setSucceeded}
                    />
                </section>
                <section>
                    <h2>Reset</h2>
                    <button
                        onClick={async () => {
                            const response = await fetch(
                                `/api/reset?password=${this.state.password}`,
                                {
                                    method: 'POST',
                                }
                            )
                            if (response.ok) {
                                this.setSucceeded(true)
                            } else {
                                this.setSucceeded(false)
                            }
                        }}
                    >
                        Reset results
                    </button>
                </section>
            </div>
        )
    }
}
