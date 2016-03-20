import React from 'react';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Label from 'react-bootstrap/lib/Label';
import {timeFormat} from '../common/time_format.js'

const columns = [
    {title: '标题', dataIndex: 'title', key: 'title'},
    {title: '发送者', dataIndex: 'sender', key: 'sender'},
    {title: '发送时间', dataIndex: 'sendtime', key: 'sendtime'},
    {title: '人数', dataIndex: 'count', key: 'count'}
];

class MessageRecordTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        var url = '/message/record/' + this.props.gamename;
        var arr = [];
        $.get(url, function (data) {

            for (var i in data) {
                var users = data[i].users.split(",");
                for(var j in users){
                    users[j] = (
                        <span>
                            <Label bsStyle="success">{users[j]}</Label>&nbsp;
                        </span>
                    );
                }
                arr.push({
                    key: data[i].id,
                    title: data[i].title,
                    sender: data[i].sender,
                    sendtime: timeFormat(data[i].sendtime),
                    count: users.length,
                    users: users,
                    body: data[i].body
                });
            }
            this.setState({data: arr});
        }.bind(this));
    }

    render() {
        return (
            <Table columns={columns}
                   expandedRowRender={record =>
                         <div>
                            <p>{record.users}</p>
                            <p>{record.body}</p>
                        </div>
                    }
                   dataSource={this.state.data}
                   className="table"/>
        );
    }

}

export default MessageRecordTable;