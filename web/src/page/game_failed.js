import React from 'react';
import GameInfo from '../components/game_info/game_info.js';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import GameSteps from '../components/game_steps/game_steps.js'
import CheckShow from '../components/forms/check_show.js'
import {Link} from 'react-router';

class GameFailed extends React.Component {
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
        console.log(this.props.params.gamename);
        if (!this.state.game)return <div></div>;
        const edit_url = "/gameedit-" + this.props.params.gamename + ".html";
        return (
            <Grid>
                <Row>
                    <Col xsOffset={1} xs={8}>
                        <GameInfo data={this.state.game}/>
                    </Col>
                    <Col xs={3}>
                        <GameSteps game={this.state.game}/>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={8}>
                        <CheckShow gamename={this.state.game.gamename}/>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={8}>
                        <Link to={edit_url} className="btn btn-default">修改赛事信息</Link>
                    </Col>
                </Row>
            </Grid>

        )
    }
}


export default GameFailed;
