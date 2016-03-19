import React from 'react';
import GameInfo from './components/game_info/game_info.js';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import GameSteps from './components/game_steps/game_steps.js'
import GameComment from './components/game_comment/game_comment'

class ShowGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {game: ''};
    }

    componentDidMount() {
        var _this = this;
        $.get('/game/' + this.props.params.gamename, function (data) {
            //console.log(data);
            _this.setState({game: data});
        });
    }


    render() {
        console.log(this.state.game);
        if (!this.state.game)return <div></div>;
        return (
            <Grid>
                <div>赛事信息</div>
                <Row>
                    <Col xsOffset={2} xs={7}>
                        <GameInfo data={this.state.game}/>
                    </Col>
                    <Col xs={3}>
                        <GameSteps game={this.state.game}/>
                    </Col>
                </Row>
                <Row>
                    <GameComment game={this.state.game}/>
                </Row>
            </Grid>

        )
    }
}


export default ShowGame;
