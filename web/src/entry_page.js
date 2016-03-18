import React from 'react';
import EntryForm from './components/entry_form/entry_form.js';
import GameInfo from './components/game_info/game_info.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';


class EntryPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {game: ''};
  }
  componentDidMount(){
    $.get('/game/'+this.props.params.gamename,function(data){
      this.setState({game:data});
    }.bind(this));
  }
    render() {
        console.log(this.context);
        return (
            <div>
              <PageHeader>{this.state.game.gametitle}  <small> {this.state.game.briefinfo} </small></PageHeader>
              <EntryForm username={this.props.params.username} gamename={this.props.params.gamename}/>
            </div>
        );
    }
}

export default EntryPage;
