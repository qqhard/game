import React from 'react';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
var Rating = require('react-rating');
import CsrfToken from '../common/csrf_token.js';

class GameRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            all: 0,
            score: 0,
            first: false
        };
    }

    componentDidMount() {
        $.get(`/gameApi/rating/${this.props.gamename}/game`, function (data) {
            if (!!data) {
                this.setState({
                    num: data.num,
                    all: data.score
                });
            }
        }.bind(this));

        $.get(`/gameApi/rating/${this.props.gamename}/user`, function (data) {
            if (!!data) {
                this.setState({
                    score: data.score
                });
            } else {
                this.setState({first: true});
            }
        }.bind(this));
    }

    onChange(val) {
        if(val < 0) val = 0;
        $.ajax({
            url: '/gameApi/rating',
            type: 'PUT',
            data: {
                gamename: this.props.gamename,
                score: val,
                _csrf: $('input[name=_csrf]').val()
            },
            success: function (data) {
                if (data == 'ok') {
                    this.setState({
                        score: val,
                        all: this.state.all + val - this.state.score,
                        num: this.state.num + (this.state.first ? 1 : 0),
                        first: false 
                    });
                } else {

                }
            }.bind(this)
        });
    }

    render() {
        console.log('all'+this.state.all+',num'+this.state.num);
        return (
            <div>
                <CsrfToken />
                <Row>
                    <Col xsOffset={1} xs={1} style={{paddingTop:'2%'}}>
                        AVG
                    </Col>
                    <Col xs={8} className="big-star">
                        <Rating
                            placeholderRate={this.state.num == 0? 0: this.state.all/this.state.num}
                            stop={10}
                            readonly={true}
                            placeholder={"glyphicon glyphicon-star"}
                            empty={'glyphicon glyphicon-star-empty'}
                            full={"glyphicon glyphicon-star"}/>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={1} style={{paddingTop:'2%'}}>
                        YOUR
                    </Col>
                    <Col xs={8} className="big-star">
                        <Rating
                            start={0}
                            placeholderRate={this.state.score}
                            stop={10}
                            onChange={this.onChange.bind(this)}
                            placeholder={"glyphicon glyphicon-star"}
                            empty={'glyphicon glyphicon-star-empty'}
                            full={"glyphicon glyphicon-star"}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GameRating;

