import React from 'react'
import $ from 'jquery'
import GameList from './components/game_list/game_list.js'

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    componentDidMount() {
        var _this = this;
        $.get('/games',function(data){
            _this.setState({data: data});
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
