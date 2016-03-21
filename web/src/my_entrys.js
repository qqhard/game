import React from 'react';
import GameList from './components/game_list/game_list.js';
import { browserHistory } from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';


class MyEntrys extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const titles = ['我报名的','已经开始','已经结束'];
        const states = ['accepted','started','ended'];
        const tabs = states.map(function(val,index){
          const url = "/game/userentrys/"+this.props.params.username+"?state="+val;
          return <Tab key={index} eventKey={index} title={titles[index]}><GameList prefix="/game-" url={url}/></Tab>;
        }.bind(this));

        return (
          <Tabs defaultActiveKey={0} position="left" bsStyle="pills" tabWidth={2}>
            {tabs}
          </Tabs>
        );
      }
}



export default MyEntrys;
