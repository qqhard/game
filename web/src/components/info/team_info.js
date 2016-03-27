import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class TeamInfo extends React.Component {
    render() {
        if (!this.props.data )return <Jumbotron></Jumbotron>;

        return (
            <Jumbotron>
                <h2>{this.props.data.cnname} (英文名:{this.props.data.enname})</h2><br/>
                <h3>招募人数：{this.props.data.limitNum}</h3><br/>
                <h3>目前人数：{this.props.data.nowNum}</h3><br/>
                <p>{this.props.data.info}</p><br/>
            </Jumbotron>
        )
    }
}

export default TeamInfo;
