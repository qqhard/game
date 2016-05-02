import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import Mine from './page/mine';
import Message from './page/message';
import Home from './page/home';
import Team from './page/team';
import Login from './page/login';
import GameShow from './game/game_show';

const ACTIVE = {color: '#0894ec'};

function setTitle(title) {
    this.setState({title: title});
}


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            title: '赛事'
        };
    }


    componentDidMount() {
        $.init();
    }

    render() {
        return (
            <div>
                <div className="page-group">
                    <div className="page">


                        {this.props.children}
                    </div>

                </div>

                <div className="panel-overlay"></div>
                <div className="panel panel-left panel-reveal">
                    <div className="content-block">
                        <p>这是一个侧栏</p>
                        <p></p>
                        <p><a href="#" className="close-panel">关闭</a></p>
                    </div>
                </div>


            </div>
        );
    }

}


render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/home.html" component={Home}/>
            <Route path="/team.html" component={Team}/>
            <Route path="/mine.html" component={Mine}/>
            <Route path="/message.html" component={Message}/>
        </Route>
        <Route path="/login.html" component={Login}/>
        <Route path="/gameshow-:gamename.html" component={GameShow}/>
    </Router>
), document.getElementById('body'));
