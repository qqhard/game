import React from 'react';
import Table from 'antd/lib/table';
import Label from 'react-bootstrap/lib/Label';
import {timeFormat} from '../common/time_format.js'

const columns = [
    {title: '域名', dataIndex: 'gamename', key: 'gamename'},
    {title: '创建者', dataIndex: 'owner', key: 'owner'},
    {title: '赛事名称', dataIndex: 'gametitle', key: 'gametitle'},
    {title: '是否通过', dataIndex: 'accepted', key: 'accepted'},
    {title: '说明', dataIndex: 'reason', key: 'reason'}
];

class ChecksMyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        var url = '/gameApi/gamechecks/' + this.props.username;

        var arr = [];
        $.get(url, function (data) {
            for (var i in data) {
                arr.push({
                    key: data[i].gamename,
                    gamename: data[i].gamename,
                    owner: data[i].game.owner,
                    gametitle: data[i].game.gametitle,
                    accepted: data[i].accepted == true ? '通过' : '拒绝',
                    reason: data[i].reason
                });
            }
            this.setState({data: arr});
        }.bind(this));
    }

    render() {
        return (
            <Table columns={columns}
                   dataSource={this.state.data}
                   className="table"/>
        );
    }

}

export default ChecksMyTable;