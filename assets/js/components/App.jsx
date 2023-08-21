import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import Root from './Root.jsx'
import Admin from './Admin.jsx'

const Div = styled.div`
    background-color: #0a3440;
    height: 100%;
    position: fixed;
    width: 100%;
    overflow-y: auto;
    font-family: sans-serif;
    font-weight: 300;
    text-align: center;
`

const AdminWrapper = styled.div`
    background-color: white;
    display: inline-block;
    padding: 2em;
    border-radius: 5px;
    margin-top: 2em;
`

export default () =>
    <Router>
        <Div>
            <Switch>
                <Route exact path='/' component={Root} />
                <Route
                    path='/admin'
                    render={() =>
                        <AdminWrapper>
                            <Admin />
                        </AdminWrapper>}
                />
                <Route render={() => <h1>404</h1>} />
            </Switch>
        </Div>
    </Router>
