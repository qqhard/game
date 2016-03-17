import React from 'react';
import GameInfo from './components/game_info/game_info.js';
import GameSteps from './components/game_steps/game_steps.js';
import CsrfToken from './components/common/csrf_token.js';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Input from 'react-bootstrap/lib/Input'


class CheckForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        'reason':'',
        'accepted':true
      };
  }
  componentDidMount(){

    if(this.props.step > 1){
      $.get('/gamecheck/'+this.props.gamename,function(data){
        //console.log(data);
        this.setState({reason: data.reason});
      }.bind(this),'json');
    }
    //console.log(this.props.gamename);
  }
  handleChange(e) {
    var val = e.target.value;
    this.setState({reason: val});
    if(val.length > 10){
      this.setState({accepted: false});
    }else{
      this.setState({accepted: true});
    }
  }
  handleAccept() {
    var body = 'reason='+this.state.reason
    +'&accepted='+this.state.accepted
    +'&_csrf='+$('input[name=_csrf]').val();
    console.log(body);
    $.post('/gamecheck/'+this.props.gamename,body,function(data){
      console.log(data);
    });
  }
  handleRefuse() {

  }
  render() {
  //  console.log(this.props.gamename);
    if(!this.props.gamename)return <div></div>;
    var check_down = true;
    if(this.props.step == 1) check_down = false;
    const styleLayout = {
      labelClassName:"col-xs-1",
      wrapperClassName:"col-xs-8"
    }

    return (
      <form>
        <Input type="textarea" label="拒绝理由" disabled={check_down} {...styleLayout} value={this.state.reason} onChange={this.handleChange.bind(this)}/>
        <CsrfToken/>
        <div className="form-group">
          <div className="col-sm-offset-0 col-sm-6">
              <ButtonGroup>
                <Button disabled={this.state.accepted||check_down} onClick={this.handleRefuse.bind(this)}>拒绝</Button>
                <Button disabled={check_down} onClick={this.handleAccept.bind(this)}>通过</Button>
              </ButtonGroup>
          </div>
        </div>
      </form>
    )
  }
}

class CheckGame extends React.Component {
  constructor(props) {
      super(props);
      this.state = {game: ''};
  }
  componentDidMount(){
    var _this = this;
    $.get('/game/'+this.props.params.gamename,function(data){
      //console.log(data);
      _this.setState({game:data});
    });
  }
  render() {
    //console.log(this.state.game);
    if(!this.state.game)return <div></div>;
    return (
      <Grid>
        <div>赛事信息</div>
        <Row>
          <Col xsOffset={2} xs={7}>
            <GameInfo data={this.state.game}/>
            <CheckForm gamename={this.state.game.gamename} step={this.state.game.step}/>
          </Col>
          <Col xs={3}>
            <GameSteps game={this.state.game}/>
          </Col>
        </Row>

      </Grid>

    )
  }
}





export default CheckGame;
