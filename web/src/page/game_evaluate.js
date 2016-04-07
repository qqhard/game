import React from 'react';
import GameInfo from '../components/info/game_info.js';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import GameSteps from '../components/game_steps/game_steps.js'
import GameComment from '../components/game_comment/game_comment'
import GameRating from '../components/rating/game_rating.js';
import './game.scss';

class GameEvaluate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {game: ''};
    }

    componentDidMount() {
        $.get('/gameApi/game/' + this.props.params.gamename, function (data) {
            this.setState({game: data});
        }.bind(this));
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
                <GameRating gamename={this.state.game.gamename}/> 
                <Row>
                    <Col xsOffset={1} xs={8}>
                        <GameComment game={this.state.game}/>
                    </Col>
                </Row>
            </Grid>

        )
    }
}


export default GameEvaluate;
