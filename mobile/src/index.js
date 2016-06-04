import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import todoApp from './reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './app';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import UserinfoPage from './containers/UserinfoPage';
import Games from './containers/Games';
import Teams from './containers/Teams';
import Messages from './containers/Messages';
import Mine from './containers/Mine';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GameDetail from './containers/GameDetail';
import IndividualEntry from './containers/IndividualEntry';
const loggerMiddleware = createLogger();

function setTitle(title) {
    this.setState({title: title});
}

const store = createStore(
    todoApp,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

injectTapEventPlugin();

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Games}/>
                <Route path="login.html" component={LoginPage}/>
                <Route path="register.html" component={RegisterPage}/>
                <Route path="userinfo.html" component={UserinfoPage}/>
                <Route path="games.html" component={Games}/>
                <Route path="teams.html" component={Teams}/>
                <Route path="messages.html" component={Messages}/>
                <Route path="mine.html" component={Mine}/>
                <Route path="gamedetail-:gamename.html" component={GameDetail}/>
                <Route path="individualentry-:gamename.html" component={IndividualEntry}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('body'));
