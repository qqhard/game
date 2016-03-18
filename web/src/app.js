import React from 'react'
import { render } from 'react-dom'
import About from './about.js'
import MyGames from './my_games.js'
import Games from './games.js'
import Entrys from './entrys.js'
import CreateGame from './create_game.js'
import EntryPage from './entry_page.js'
import ShowGame from './show_game.js'
import CheckGame from './check_game.js'
import UserinfoPage from './userinfo_page.js'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

const ACTIVE = { color: 'white' }

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:''
    }
  }
  componentWillMount(){
    $.get('/username',function(data){
      this.setState({username:data});
    }.bind(this)).error(function(e){
        if(e.status == 403) top.location='/login';
    });
  }

  render() {
    const userinfo_url = "/userinfo-"+this.state.username+".html";
    const entry_url = "/entry-"+this.state.username+".html";
    const my_games_url = "/games-"+this.state.username+".html";
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" >
          <div className="container-fluid">
            <div className="navbar-header">
              <ul className="nav navbar-nav">
                  <li><a id="menu-toggle" href="#">@</a></li>
              </ul>

              <a className="navbar-brand" href="/" >HITWH-ACM</a>
            </div>

            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/notice.html" activeStyle={ACTIVE}>notice</Link></li>
                <li><Link to="/games.html" activeStyle={ACTIVE}>赛事列表</Link></li>
                <li><Link to={my_games_url} activeStyle={ACTIVE}>我的赛事</Link></li>
                <li><Link to="/game.html" activeStyle={ACTIVE}>发布赛事</Link></li>
                <li><Link to={entry_url} activeStyle={ACTIVE}>报名参赛</Link></li>
                <li><Link to={userinfo_url} activeStyle={ACTIVE}>用户信息</Link></li>
                <li><a href="/register">register</a></li>
                <li><a href="/login">login</a></li>
              </ul>
            </div>

          </div>
        </nav>

        <div className="container">{this.props.children}</div>
      </div>
    )
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <h2>Index!</h2>
        <h2>Index!</h2>
        <h2>Index!</h2>
        <h2>Index!</h2>
        <h2>Index!</h2>
      </div>
    )
  }
}


class UsersIndex extends React.Component {
  render() {
    return (
      <div>
        <h3>UsersIndex</h3>
      </div>
    )
  }
}



render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/notice.html" component={About}/>
      <Route path="/games.html" component={Games}/>
      <Route path="/games-:username.html" component={MyGames}/>
      <Route path="/game.html" component={CreateGame}/>
      <Route path="/entry-:username-:gamename.html" component={EntryPage}/>
      <Route path="/userinfo-:username.html" component={UserinfoPage}/>
      <Route path="/game-:gamename.html" component={ShowGame}/>
      <Route path="/gamecheck-:gamename.html" component={CheckGame}/>
      <Route path="/entrys-:gamename.html" component={Entrys}/>
    </Route>
  </Router>
), document.getElementById('body'))
