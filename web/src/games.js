import React from 'react'
import GameList from './components/game_list/game_list.js'
import { browserHistory } from 'react-router'

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    componentDidMount() {
        var _this = this;
        $.get('/games',function(data){
            _this.setState({data: data});
        }).error(function(e){
          if(e.status == 403){
              top.location='/login';
          }
        });
    }
    render() {
        return (
            <div>
                <GameList data={this.state.data}/>
            </div>
        )
    }
}

export default Games;
