import React from 'react';
import Row from '../../../node_modules/react-bootstrap/lib/Row'
import Col from '../../../node_modules/react-bootstrap/lib/Col'
import Jumbotron from '../../../node_modules/react-bootstrap/lib/Jumbotron';
import {timeFormat} from '../common/time_format.js';

class GameInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data == '')return <Jumbotron/>;

        [
            {'label': '赛事域名', 'name': 'gamename'},
            {'label': '赛事名称', 'name': 'gametitle'},
            {'label': '赛事简介', 'name': 'briefinfo'},
            {'label': '比赛时间', 'name': 'gametime'},
            {'label': '比赛地点', 'name': 'gameplace'},
            {'label': '赛事名称', 'name': 'gametitle'},
            {'label': '省份限制', 'name': 'provincename'},
            {'label': '高校限制', 'name': 'collegename'},
            {'label': '学院限制', 'name': 'institutename'}
        ].map(function (val, index) {
            return (
                <Row key={index} className="show-grid">
                    <Col xs={2}>{val.label}</Col>
                    <Col xs={10}>{this.props.data[val.name]}</Col>
                </Row>
            )
        }.bind(this));
        this.props.data.formList.map(function (val, index) {
            return (
                <Row key={index+13} className="show-grid">
                    <Col xs={2}>{"自定义表单" + index}</Col>
                    <Col xs={10}>{val.name}</Col>
                </Row>
            )
        });

        return (

            <Jumbotron>
                <h2>{this.props.data.gametitle}</h2><br/>
                <h3>赛事简介：</h3>
                <p>{this.props.data.briefinfo}</p><br/>
                <h3>赛事时间：</h3>
                <p>{this.props.data.gametime}</p><br/>
                <h3>赛事地点：</h3>
                <p>{this.props.data.gameplace}</p><br/>
                <h4>报名开始：</h4>
                <p>{timeFormat(this.props.data.startTime)}</p><br/>
                <h4>报名截止：</h4>
                <p>{timeFormat(this.props.data.dueTime)}</p><br/>
            </Jumbotron>

        )
    }
}

export default GameInfo;
