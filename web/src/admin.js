import React from 'react';
import {render} from 'react-dom'
import MyChecks from './game/my_checks.js'
import CheckGame from './game/check_game.js'
import MyMessage from './message/my_message.js'
import Login from './auth/login.js';
import Register from './auth/register.js';
import 'antd/lib/index.css';
import './app.scss';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import Footer from './components/common/footer.js';

const ACTIVE = {color: 'black'};


const guestNav = (
    <ul className="nav navbar-nav navbar-right">
        <li><Link to="/register.html">register</Link></li>
        <li><Link to="/login.html">login</Link></li>
    </ul>
);

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            msg_num: 0,
            role: 'GUEST'
        }
        $('#loading').remove();
    }

    componentWillMount() {
        $.get('/userApi/userrole', function (data) {
            console.log(data);
            this.setState({username: data.username, role: data.role});
        }.bind(this)).error(function (e) {

        });
    }

    componentDidMount() {
        var get_msg_num = function () {
            $.get("/message/recv/count", function (data) {
                this.setState({msg_num: data});
            }.bind(this)).error(function (e) {

            });
        }.bind(this);
        get_msg_num();
        window.setInterval(get_msg_num, 10000);
    }

    render() {
        const my_checks_url = "/gamechecks-" + this.state.username + ".html";
        const my_message_url = "/message-" + this.state.username + ".html";
        const adminNav = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to={my_message_url} activeStyle={ACTIVE}>消息 <span
                    className="badge">{this.state.msg_num}</span></Link></li>
                <li><Link to={my_checks_url} activeStyle={ACTIVE}>赛事审批</Link></li>
                <li><a href="/userApi/logout">logout</a></li>
            </ul>
        );
        var nav = null;
        if (this.state.role == 'ADMIN') nav = adminNav;
        else nav = guestNav;

        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top" style={{zIndex:100}}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">Game Factory</Link>
                            <ul className="nav navbar-nav">
                                <li><a id="menu-toggle" href="#"></a></li>

                            </ul>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            {nav}
                        </div>
                    </div>
                </nav>
                <div style={{height:'20px'}}></div>
                <div style={{minHeight:'600px'}}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}


render((
    <Router history={browserHistory}>
        <Route path="/" component={Admin}>
            <IndexRoute component={MyMessage}/>
            <Route path="/gamecheck-:gamename.html" component={CheckGame}/>
            <Route path="/gamechecks-:username.html" component={MyChecks}/>
            <Route path="/message-:username.html" component={MyMessage}/>
            <Route path="/login.html" component={Login}/>
            <Route path="/register.html" component={Register}/>
        </Route>
    </Router>
), document.getElementById('body'));
