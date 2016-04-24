import React from 'react';
import Table from 'antd/lib/table';
import {Link, browserHistory} from 'react-router'

const columns = [
    {title: '域名', dataIndex: 'gamename', key: 'gamename'},
    {title: '创建者', dataIndex: 'owner', key: 'owner'},
    {title: '赛事名称', dataIndex: 'gametitle', key: 'gametitle'},
    {title: '省份', dataIndex: 'provincename', key: 'provincename'},
    {title: '高校', dataIndex: 'collegename', key: 'collegename'},
    {title: '学院', dataIndex: 'institutename', key: 'institutename'}, {
        title: '操作',
        key: 'operation',
        render(text, record){
            var url = "/gamecheck-" + record.gamename + ".html";
            return (
                <span>
                    <Link to={url}>进行审批</Link>
                </span>
            );
        }
    }
];

class ChecksUnTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        var url = '/gameApi/gamechecks';
        // var arr = [];

        $.get(url, function (data) {
            for (var i in data) {
                data[i].key = data[i].gamename;
            }
            this.setState({data: data});
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

export default ChecksUnTable;