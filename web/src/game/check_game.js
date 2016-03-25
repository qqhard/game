import React from 'react';
import GameDetailInfo from '../components/info/game_detail_info.js'
import GameSteps from './../components/game_steps/game_steps.js';
import CsrfToken from './../components/common/csrf_token.js';
import Grid from '../../node_modules/react-bootstrap/lib/Grid'
import Row from '../../node_modules/react-bootstrap/lib/Row'
import Col from '../../node_modules/react-bootstrap/lib/Col'
import ButtonGroup from '../../node_modules/react-bootstrap/lib/ButtonGroup'
import Button from '../../node_modules/react-bootstrap/lib/Button'
import Input from '../../node_modules/react-bootstrap/lib/Input'
import { browserHistory } from 'react-router';
import message from 'antd/lib/message';

class CheckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: '',
            disabled: true,
            step: this.props.step
        };
    }

    componentDidMount() {
        if (this.props.step > 1) {
            $.get('/gameApi/gamecheck/' + this.props.gamename, function (data) {
                this.setState({reason: data.reason});
            }.bind(this), 'json');
        }

    }

    handleChange(e) {
        var val = e.target.value;
        this.setState({reason: val});
        if (val.length > 10) {
            this.setState({
                disabled: false
            });
        } else {
            this.setState({disabled: true});
        }
    }

    serializeForm(accepted){
        var body = 'reason=' + this.state.reason
            + '&accepted=' + accepted
            + '&_csrf=' + $('input[name=_csrf]').val();
        return body;
    }

    handleAccept() {
        var body = this.serializeForm(true);
        $.post('/gameApi/gamecheck/' + this.props.gamename, body, function (data) {
            message.success("审批成功！");
            this.setState({step:2});
        }.bind(this)).error(function (e) {
            message.error("审批出错！");
        });
    }

    handleRefuse() {
        var body = this.serializeForm(false);
        $.post('/gameApi/gamecheck/' + this.props.gamename, body, function (data) {
            message.success("审批成功！");
            this.setState({step:2});
        }.bind(this)).error(function (e) {
            message.error("审批出错！");
        });
    }

    render() {
        if (!this.props.gamename)return <div></div>;
        var check_down = true;
        if (this.state.step == 1) check_down = false;

        return (
            <form>
                <Input type="textarea" label="拒绝理由" disabled={check_down}  value={this.state.reason}
                       onChange={this.handleChange.bind(this)}/>
                <CsrfToken/>
                <div className="form-group">
                    <ButtonGroup>
                        <Button disabled={this.state.disabled||check_down}
                                onClick={this.handleRefuse.bind(this)}>拒绝</Button>
                        <Button disabled={check_down} onClick={this.handleAccept.bind(this)}>通过</Button>
                    </ButtonGroup>
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

    componentDidMount() {
        var _this = this;
        $.get('/gameApi/game/' + this.props.params.gamename, function (data) {
            _this.setState({game: data});
        });
    }

    render() {
        if (!this.state.game)return <div></div>;
        return (
            <Grid>
                <Row>
                    <Col xsOffset={2} xs={7}>
                        <GameDetailInfo data={this.state.game}/>
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
