import React from 'react';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Label from 'react-bootstrap/lib/Label';
import {timeFormat} from '../common/time_format.js';
import {textBrief} from '../common/text_brief.js';

const columns = [
    {title: '收信人', dataIndex: 'recver', key: 'recver'},
    {
        title: '发送时间',
        dataIndex: 'sendtime',
        key: 'sendtime',
        sorter(a, b) {
            console.log(a);
            return a.sendtime - b.sendtime;
        }
    }, {
        title: '阅读时间',
        dataIndex: 'recvtime',
        key: 'recvtime',
        sorter(a, b) {
            return a.recvtime - b.recvtime;
        }
    },
    {title: '简要信息', dataIndex: 'brief', key: 'brief'}
];

class MessageSendTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pagination: {},
            data: []
        };
    }

    componentDidMount() {
        this.fetch()
    }

    fetch(params = {}){
        this.setState({ loading: true });
        $.get('/message/send',params, function (result) {
            var arr = [];
            var data = result.data;
            for (var i in data) {
                arr.push({
                    key: data[i].id,
                    recver: data[i].recver,
                    sendtime: data[i].sendTime,
                    recvtime: data[i].readTime == 0 ? '未读' : timeFormat(data[i].readTime),
                    brief: textBrief(data[i].text, 20),
                    text: data[i].text
                });
            }
            const pagination = this.state.pagination;
            pagination.total = result.totalCount;
            this.setState({data: arr,loading: false,pagination});
        }.bind(this)).error(function (e) {
            this.setState({data: []});
        }.bind(this));
    }

    onChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        const params = {
            pageSize: pagination.pageSize,
            currentPage: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order
        };
        this.fetch(params);
    }
  

    render() {
        return (
            <Table columns={columns}
                   expandedRowRender={record =>
                         <div>
                            <p>{record.text}</p>
                        </div>
                    }
                   dataSource={this.state.data}
                   onChange={this.onChange.bind(this)}
                   loading={this.state.loading}
                   className="table"
            />
        );
    }

}

export default MessageSendTable;