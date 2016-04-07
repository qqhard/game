import React from 'react';
import GameForm from '../components/forms/game_form.js';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class GameEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null
        }
    }

    componentWillMount() {
        const url = "/gameApi/gamecheck/game/"+this.props.params.gamename;
        $.get(url,function (data) {
            this.setState({game:data});
            console.log(data);
        }.bind(this));
    }

    render() {
        console.log(this.context);
        if (!this.state.game)return (
            <div>
                <Row>
                    <Col offset="4" span="16">
                        <PageHeader>修改赛事
                            <small> 根据审批人意见修改并重新提交</small>
                        </PageHeader>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div>
                <Row>
                    <Col offset="4" span="16">
                        <PageHeader>修改赛事
                            <small> 根据审批人意见修改并重新提交</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col offset="4" span="20">
                        <GameForm game={this.state.game} disabled={true}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GameEdit;
