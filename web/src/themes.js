import React from 'react';
import {browserHistory, Link} from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import {Progress} from 'antd';
import Input from 'react-bootstrap/lib/Input';
import message from 'antd/lib/message';

const ACTIVE = {color: 'white'}

class Themes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            game: null,
            data: []
        };
    }

    componentDidMount() {
        $.get('/theme/themes', function (data) {
            this.setState({data: data});
        }.bind(this));
        $.get('/gameApi/games/owned', function (data) {
            this.setState({games: data});
            if (!!data && data.length > 0) {
                this.setState({game: data[0]});
            }
        }.bind(this));
    }

    handleSelect(e) {
        this.setState({game: e.target.value});
    }

    handleClick(url) {
        console.log(this.state.game);
        if(!!this.state.game){
            window.open(url);
        }else{
            message.error("请选择一个赛事！"); 
        }
    }

    render() {
        const styleLayout = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-10"
        };
        const cols = this.state.data.map(function (val, index) {
            var theme_url = `/theme/${val.name}/${this.state.game}`;
            var img_url = `http://domain.com/static/${val.name}/index.png`;
            return (
                <Col key={index} xs={6} md={4}>
                    <a target="_blank" onClick={this.handleClick.bind(this,theme_url)}>
                        <Thumbnail src={img_url} alt="242x100">
                        </Thumbnail>
                    </a>
                </Col>
            );
        }.bind(this));
        const options = this.state.games.map(function (val, index) {
            return <option key={index} value={val}>{val}</option>;
        }.bind(this));
        return (
            <Grid>
                <Row>
                    <Col md={6} offset={4}>
                        <Input  {...styleLayout } style={{marginBottom:"10px"}} label="选择赛事" type="select" placeholder="select"
                               onChange={this.handleSelect.bind(this)}
                               value={this.state.game}
                        >
                            {options}
                        </Input>

                    </Col>
                </Row>
                <Row>
                    {cols}
                </Row>
            </Grid>
        );
    }
}


export default Themes;
