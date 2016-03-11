import React from 'react'
import './game_list.scss'

class GameList extends React.Component {
    render() {
        var nodes = this.props.data.map(function(game){
            return (
                <GameNode key={game.gamename}
                    gamename={game.gamename}
                    briefinfo={game.briefinfo}
                    gameTime={game.gameTime}
                    gamePlace={game.gamePlace}
                />
            );
        });
        return (
            <ul className="list-group">
                {nodes}
            </ul>
        )
    }
}

class GameNode extends React.Component {
    render() {
        var href = "/game/" + this.props.gamename;
        return (
            <li className="list-group-item">
                <h2 className="list-group-item-heading">
                    <a href={href}>{this.props.gamename}</a>
                </h2>
                <p className="list-group-item-text">{this.props.briefinfo}</p>
                <div className="right-top">{this.props.gamePlace}</div>
                <div>{this.props.gameTime}</div>
            </li>
        )
    }
}

export default GameList;
