import React from 'react';
import Jumbotron from '../../../node_modules/react-bootstrap/lib/Jumbotron';

class GameLimitInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provincename: '',
            collegename: '',
            institutename: ''
        }
    }

    fetchBelongName(provinceid, collegeid, instituteid) {
        if(!provinceid)provinceid = 0;
        if(!collegeid)collegeid = 0;
        if(!instituteid)instituteid = 0;
        const belong_url = `/gameApi/belong/${provinceid}/${collegeid}/${instituteid}`;
        $.get(belong_url, function (data) {
            this.setState(data);
        }.bind(this));
    }

    componentDidMount() {
        this.fetchBelongName(this.props.data.provinceid, this.props.data.collegeid, this.props.data.instituteid);
    }

    render() {
        if (this.props.data == '')return <Jumbotron/>;

        var entryType = null;
        if (this.props.data.teamMin == 1 && this.props.data.teamMax == 1) {
            entryType = <h3>参赛形式： 个人</h3>;
        } else {
            var tmp = `${this.props.data.teamMin}到${this.props.data.teamMax}`;
            entryType = <h3>参赛形式： 队伍({tmp})</h3>;
        }

        return (
            <Jumbotron>
                <h3>赛事时间：</h3>
                <p>{this.props.data.gametime}</p>
                <h3>赛事地点：</h3>
                <p>{this.props.data.gameplace}</p>

                <h3>省份限制： {this.state.provincename||'无限制'}</h3>
                <h3>高校限制： {this.state.collegename||'无限制'}</h3>
                <h3>学院限制： {this.state.institutename||'无限制'}</h3>
                {entryType}
            </Jumbotron>

        )
    }
}

export default GameLimitInfo;
