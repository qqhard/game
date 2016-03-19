import React from 'react'
import './game_list.scss'
import { Link } from 'react-router'

const ACTIVE = { color: 'white' }

class GameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    $.get(this.props.url,function(data){
        this.setState({data: data});
    }.bind(this)).error(function(e){
      if(e.status == 403){
          top.location='/login';
      }
    });
  }
  render() {
    var nodes = this.state.data.map(function(game){
      return (
        <GameNode key={game.gamename}
            prefix={this.props.prefix}
            gamename={game.gamename}
            briefinfo={game.briefinfo}
            gameTime={game.gameTime}
            gamePlace={game.gamePlace}
        />
      );
  }.bind(this));
    return (
      <ul className="list-group">
          {nodes}
      </ul>
    )
  }
}

class GameNode extends React.Component {
    render() {
        var href = this.props.prefix + this.props.gamename + '.html';
        return (
            <li className="list-group-item">
                <h2 className="list-group-item-heading">
                    <Link to={href} activeStyle={ACTIVE}>{this.props.gamename}</Link>
                </h2>
                <p className="list-group-item-text">{this.props.briefinfo}</p>
                <div className="right-top">{this.props.gamePlace}</div>
                <div>{this.props.gameTime}</div>
            </li>
        )
    }
}

export default GameList;
