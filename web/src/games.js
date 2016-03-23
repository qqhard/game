import React from 'react';
import GameList from './components/game_list/game_list.js';
import {browserHistory, Link} from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';


const ACTIVE = {color: 'white'}

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            data: []
        };
    }

    componentDidMount() {
        $.get('/userApi/username', function (data) {
            this.setState({username: data});
        }.bind(this));
        $.get('/gameApi/games?state=accepted', function (data) {
            this.setState({data: data});
        }.bind(this));
    }

    render() {
        const cols = this.state.data.map(function (val, index) {
            var game_url = "/game-" + val.gamename + ".html";
            var entry_url = "/entry-" + this.state.username + '-' + val.gamename + '.html';
            return (
                <Col key={index} xs={6} md={4}>
                    <Thumbnail src="http://img3.91.com/uploads/allimg/141110/703-141110105223.jpg" alt="242x200">
                        <h3>{val.gametitle}</h3>
                        <p>{val.briefinfo}</p>
                        <p>
                            <Link to={game_url} className="btn btn-primary btn-sm">赛事主页</Link>&nbsp;
                            <Link to={entry_url} className="btn btn-default btn-sm">赛事报名</Link>
                        </p>
                    </Thumbnail>
                </Col>
            );
        }.bind(this));
        return (
            <Grid>
                <Row>
                    {cols}
                </Row>
            </Grid>
        );
    }
}


export default Games;
