import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Events from './events/Events'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import CreateEvent from './createEvent/CreateEvent'
import {GlobalState} from '../../GlobalState'




//link frontend routes
function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>

            <Route path="/" exact component={Login} />


            <Route path="/event" exact component={Events} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/create_event" exact component={isAdmin ? CreateEvent : NotFound} />
            <Route path="/edit_event/:id" exact component={isAdmin ? CreateEvent : NotFound} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
