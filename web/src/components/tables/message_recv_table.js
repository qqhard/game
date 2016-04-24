import React from 'react';
import Table from 'antd/lib/table';
import {timeFormat} from '../common/time_format.js';
import {textBrief} from '../common/text_brief.js';

const columns = [
    {title: '发送者', dataIndex: 'sender', key: 'sender'},
    {title: '发送时间', dataIndex: 'sendtime', key: 'sendtime'},
    {title: '阅读时间', dataIndex: 'recvtime', key: 'recvtime'},
    {title: '简要信息', dataIndex: 'brief', key: 'brief'}
];

class MessageRecvTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {

        $.get('/message/recv', function (data) {
            var arr = [];
            for (var i in data) {
                arr.push({
                    key: data[i].id,
                    sender: data[i].sender,
                    sendtime: timeFormat(data[i].sendTime),
                    recvtime: data[i].readTime == 0 ? '未读' : timeFormat(data[i].readTime),
                    brief: textBrief(data[i].text,20),
                    text: data[i].text
                });
            }
            this.setState({data: arr});
        }.bind(this)).error(function (e) {
            this.setState({data: []});
        }.bind(this));
    }

    expandedRowRender(record){

        if(record.recvtime == '未读'){
            $.get('/message/read/'+record.key,{},function (data) {
                console.log(data);
                record.recvtime = timeFormat(data);
                this.setState({data: this.state.data});
            }.bind(this));
        }
        return(
            <div>
                <p>{record.text}</p>
            </div>
        )
    }

    render() {
        return (
            <Table columns={columns}
                   expandedRowRender={this.expandedRowRender.bind(this)}
                   dataSource={this.state.data}
                   className="table"
            />
        );
    }

}

export default MessageRecvTable;