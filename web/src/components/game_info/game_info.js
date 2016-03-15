import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'


class GameInfo extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props.data.formList);
    if(this.props.data == '')return <Grid></Grid>;

    const infoList = [
      {'label':'赛事域名','name':'gamename'},
      {'label':'赛事名称','name':'gametitle'},
      {'label':'赛事简介','name':'briefinfo'},
      {'label':'比赛时间','name':'gametime'},
      {'label':'比赛地点','name':'gameplace'},
      {'label':'赛事名称','name':'gametitle'},
      {'label':'省份限制','name':'provincename'},
      {'label':'高校限制','name':'collegename'},
      {'label':'学院限制','name':'institutename'}
    ].map(function(val,index){
      return (
        <Row key={index} className="show-grid">
          <Col xs={2}>{val.label}</Col>
          <Col xs={10}>{this.props.data[val.name]}</Col>
        </Row>
      )
    }.bind(this));
    const formList = this.props.data.formList.map(function(val,index){
      return (
        <Row key={index+13} className="show-grid">
          <Col xs={2}>{"自定义表单"+index}</Col>
          <Col xs={10}>{val.name}</Col>
        </Row>
      )
    });

    return(
      <Grid>
        {infoList}
        {formList}
      </Grid>
    )
  }
}

export default GameInfo;
