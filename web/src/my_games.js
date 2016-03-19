import React from 'react';
import GameList from './components/game_list/game_list.js';
import { browserHistory } from 'react-router';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

class MyGames extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
      const titles = ['提交的赛事','审核的赛事','已经开始','已经结束'];
      const states = ['submited','accepted','started','ended'];
      const prefixs = ['/game-','/gamemanage-','/gamemanage-','/gamemanage-'];
      const tabs = states.map(function(val,index){
        const url = "/games/"+this.props.params.username+"?state="+val;
        return <Tab key={index} eventKey={index} title={titles[index]}><GameList prefix={prefixs[index]} url={url}/></Tab>;
      }.bind(this));

      return (
        <Tabs defaultActiveKey={0} position="left" bsStyle="pills" tabWidth={2}>
          {tabs}
        </Tabs>
      );
    }
}

export default MyGames;
