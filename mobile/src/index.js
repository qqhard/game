import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import todoApp from './reducers';
import Page from './components/Page';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './app';
import LoginForm from './containers/LoginForm';
import Games from './containers/Games';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GameDetail from './containers/GameDetail';
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
                <IndexRoute component={Page}/>
                <Route path="login.html" component={LoginForm}/>
                <Route path="games.html" component={Games}/>
                <Route path="gamedetail-:gamename.html" component={GameDetail}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('body'));
