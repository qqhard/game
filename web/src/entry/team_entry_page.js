import React from 'react';
import TeamForm from './../components/forms/team_form.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import GameLimitInfo from './../components/info/game_limit_info.js';
import Steps from 'antd/lib/steps';
import RegisterForm from './../components/forms/register_form.js';
import LoginForm from './../components/forms/login_form.js';
import UserinfoForm from './../components/forms/userinfo_form.js';
import EntryInfo from './../components/info/entry_info.js';
import './entry.scss';
const Step = Steps.Step;

class TeamEntryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: '',
            entry: null,
            step: 0
        };
    }

    componentDidMount() {
        $.get('/gameApi/game/' + this.props.params.gamename, function (data) {
            console.log(data);
            this.setState({game: data});
        }.bind(this));
        $.get(`/gameApi/entry/${this.props.params.gamename}`, function (data) {
            if (!!data) {
                console.log(data);
                this.setState({step: 4, entry: data});
            } else {
                $.get('/userApi/userinfo', function (data) {
                    this.setState({step: 2})
                }.bind(this)).error(function (error) {
                    this.setState({step: 0});
                }.bind(this));
            }
        }.bind(this));
    }

    nextStep() {
        if (this.state.step == 3) {
            $.get(`/gameApi/entry/${this.props.params.gamename}`, function (data) {
                if (!!data) {
                    this.setState({entry: data});
                }
            }.bind(this));
        }
        this.setState({step: this.state.step + 1});
    }

    setStep(step) {
        this.setState({step: step});
    }

    render() {
        var gameLimitInfo = null;
        if (!!this.state.game) gameLimitInfo = <GameLimitInfo data={this.state.game}/>;

        const toLogin = <a onClick={this.setStep.bind(this,1)}>已经拥有系统账号</a>;
        const toRegister = <a onClick={this.setStep.bind(this,0)}>注册新账号</a>;
        const entryStep = [
            <Col xsOffset={2} xs={8}>
                <RegisterForm nextStep={this.nextStep.bind(this)}/>
            </Col>,
            <Col xsOffset={2} xs={8}><LoginForm nextStep={this.nextStep.bind(this)} query=""/></Col>,
            <Col><UserinfoForm nextStep={this.nextStep.bind(this)}/></Col>,
            <Row>
                <TeamForm game={this.state.game} gamename={this.props.params.gamename}/>
            </Row>
        ]

        return (
            <div className="container">
                <Row>
                    <Col xsOffset={1} xs={10}>
                        <PageHeader className="game-name">{this.state.game.gametitle}
                            <small> {this.state.game.briefinfo} </small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        {gameLimitInfo}
                    </Col>
                </Row>
                <Row style={{marginBottom:"40px"}}>
                    <Col xsOffset={2} xs={8}>
                        <Steps current={this.state.step}>
                            <Step title="用户注册" icon="user" description={toRegister}/>
                            <Step title="用户登录" icon="user" description={toLogin}/>
                            <Step title="用户信息" icon="solution"/>
                            <Step title="队伍申请" icon="team"/>
                        </Steps>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={2} xs={8}>
                        {entryStep[this.state.step]}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TeamEntryPage;
