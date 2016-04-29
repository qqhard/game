import React from 'react';
import {browserHistory, Link} from 'react-router';
import Grid from '../../node_modules/react-bootstrap/lib/Grid';
import Row from '../../node_modules/react-bootstrap/lib/Row';
import Col from '../../node_modules/react-bootstrap/lib/Col';
import Thumbnail from '../../node_modules/react-bootstrap/lib/Thumbnail';
import Progress from 'antd/lib/progress';
const ProgressLine = Progress.Line;

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
            console.log(val);
            var game_url = "/game-" + val.gamename + ".html";
            var entry_url = null;
            if(val.teamMin == 1 && val.teamMax == 1){
                entry_url = "/entry-" + val.gamename + '.html';
            }else{
                entry_url = "/teamentry-" + val.gamename + '.html';
            }
            const percent = ( Date.parse(new Date()) - val.startTime) / (val.dueTime - val.startTime) * 100;
            return (
                <Col key={index} xs={6} md={4}>
                    <Thumbnail src="http://acmgnyr.org/icpclogo_big.png" alt="242x200">
                        <ProgressLine percent={percent} strokeWidth={5} showInfo={false}/>
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
