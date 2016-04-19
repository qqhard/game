import React from 'react';
import {render} from 'react-dom'
import MyGames from './game/my_games.js'
import Games from './game/games.js'
import Themes from './themes.js'
import MyEntrys from './my_entrys.js'
import MyChecks from './game/my_checks.js'
import CreateGame from './game/create_game.js'
import EntryPage from './entry/entry_page.js'
import ShowGame from './show_game.js'
import CheckGame from './game/check_game.js'
import UserinfoPage from './user/userinfo_page.js'
import UserinfoShow from './user/userinfo_show.js'
import GameManage from './game/game_manage.js'
import MyMessage from './my_message.js'
import GameSubmited from './page/game_submited.js'
import GameFailed from './page/game_failed.js'
import GameEdit from './page/game_edit.js'
import GameEvaluate from './page/game_evaluate.js'
import GameDetailEdit from './game/game_detail_edit.js';
import TeamPage from './team/team_page.js'
import MyTeams from './team/my_teams.js'
import Teams from './team/teams.js'
import TeamManage from './team/team_manage.js'
import TeamShow from './team/team_show.js'
import Button from 'react-bootstrap/lib/Button'
import Login from './auth/login.js';
import LoginCheckEmail from './auth/login_check_email.js';
import Register from './auth/register.js';
import CheckEmailActivationCodeComponent from './check-email-activation-code-component';
import 'antd/lib/index.css';
import './app.scss';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

const ACTIVE = {color: 'black'};


const guestNav = (
    <ul className="nav navbar-nav navbar-right">
        <li><Link to="/games.html" activeStyle={ACTIVE}>赛事列表</Link></li>
        <li><a href="/register.html">register</a></li>
        <li><a href="/login.html">login</a></li>
    </ul>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            msg_num: 0,
            role: 'GUEST'
        }
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
        const userinfo_url = "/userinfo-" + this.state.username + ".html";
        const my_games_url = "/games-" + this.state.username + ".html";
        const my_entrys_url = "/entrys-" + this.state.username + ".html";
        const my_message_url = "/message-" + this.state.username + ".html";
        const my_checks_url = "/gamechecks-" + this.state.username + ".html";
        const my_teams_url = "/teams-" + this.state.username + ".html";
        const userNav = (
            <ul className="nav navbar-nav navbar-right">

                <li><Link to={my_message_url} activeStyle={ACTIVE}>消息 <span
                    className="badge">{this.state.msg_num}</span></Link></li>
                <li><Link to="/themes.html" activeStyle={ACTIVE}>主题</Link></li>
                <li><Link to="/teams.html" activeStyle={ACTIVE}>队伍列表</Link></li>
                <li><Link to={my_games_url} activeStyle={ACTIVE}>我的赛事</Link></li>
                <li><Link to={my_entrys_url} activeStyle={ACTIVE}>我参与的</Link></li>
                <li><Link to={my_teams_url} activeStyle={ACTIVE}>我的队伍</Link></li>
                <li><Link to={userinfo_url} activeStyle={ACTIVE}>{this.state.username}</Link></li>
                <li><a href="/userApi/logout">logout</a></li>
            </ul>
        );
        const adminNav = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to={my_checks_url} activeStyle={ACTIVE}>赛事审批</Link></li>
                <li><a href="/userApi/logout">logout</a></li>
            </ul>
        );
        var nav = null;
        if (this.state.role == 'USER') nav = userNav;
        else if (this.state.role == 'ADMIN') nav = adminNav;
        else nav = guestNav;

        const innerButton = <Button >search</Button>;

        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top" style={{zIndex:100}}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Game Factory</a>
                            <ul className="nav navbar-nav">
                                <li><a id="menu-toggle" href="#"></a></li>

                            </ul>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            {nav}
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
}


render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Games}/>
            <Route path="/games.html" component={Games}/>
            <Route path="/games-:username.html" component={MyGames}/>
            <Route path="/entrys-:username.html" component={MyEntrys}/>
            <Route path="/game.html" component={CreateGame}/>
            <Route path="/entry-:gamename.html" component={EntryPage}/>
            <Route path="/userinfo-:username.html" component={UserinfoPage}/>
            <Route path="/userinfoshow-:username.html" component={UserinfoShow}/>
            <Route path="/game-:gamename.html" component={ShowGame}/>
            <Route path="/gamedetailedit-:gamename.html" component={GameDetailEdit}/>
            <Route path="/gamecheck-:gamename.html" component={CheckGame}/>
            <Route path="/gamemanage-:gamename.html" component={GameManage}/>
            <Route path="/message-:username.html" component={MyMessage}/>
            <Route path="/gamechecks-:username.html" component={MyChecks}/>
            <Route path="/gamefailed-:gamename.html" component={GameFailed}/>
            <Route path="/gamesubmited-:gamename.html" component={GameSubmited}/>
            <Route path="/gameedit-:gamename.html" component={GameEdit}/>
            <Route path="/gameevaluate-:gamename.html" component={GameEvaluate}/>
            <Route path="/team.html" component={TeamPage}/>
            <Route path="/teams.html" component={Teams}/>
            <Route path="/teams-:username.html" component={MyTeams}/>
            <Route path="/teammanage-:teamid.html" component={TeamManage}/>
            <Route path="/teamshow-:teamid.html" component={TeamShow}/>
            <Route path="/themes.html" component={Themes}/>
            <Route path="/login.html" component={Login}/>
            <Route path="/register.html" component={Register}/>
            <Route path="/login-check-email-:code.html" component={LoginCheckEmail}/>
            <Route path="/checkEmailActivationCode-:username-:code.html"
                   component={CheckEmailActivationCodeComponent}/>
        </Route>
    </Router>
), document.getElementById('body'));
