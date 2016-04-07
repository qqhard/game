import React from 'react';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CsrfToken from '../common/csrf_token.js';
import {Link} from 'react-router';


class ManagerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        var url = '/gameApi/managers/' + this.props.gamename;

        var arr = [];
        $.get(url, function (data) {
            for (var i in data) {
                arr.push({
                    key: data[i].id,
                    username: data[i].username
                });
            }
            this.setState({data: arr});
        }.bind(this));
    }

    handleSubmit() {
        if (!this.state.username || this.state.length == 0) {
            message.error('不能为空！');
        }
        const url = '/gameApi/manager';
        const data = {
            username: this.state.username,
            gamename: this.props.gamename,
            _csrf: $('input[name=_csrf]').val()
        };
        $.post(url, data, function (data) {
            message.success('成功添加！');
            var arr = this.state.data;
            arr.push({key: data.id, username: data.username});
            this.setState({data: arr});
        }.bind(this)).error(function (e) {
            if (e.status == 403) {
                message.error('权限问题！');
            } else if (e.status == 404) {
                message.error('用户名不存在！');
            } else {
                message.error('出现错误！');
            }
        }.bind(this));
    }

    handleChange(e) {
        this.setState({username: e.target.value});
    }

    handleDelete(record) {
        var del_url = `/gameApi/manager/${record.key}`;
        $.ajax({
            url: del_url,
            type: "PUT",
            data: {_csrf: $('input[name=_csrf]').val()},
            success: function (data) {
                var arr = this.state.data;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].key == record.key) {
                        arr.splice(i,1);
                        break;
                    }
                }
                this.setState({data: arr});
                message.success('删除成功!');
            }.bind(this),
            error: function (e) {
                if (e.status == 403) {
                    message.error('权限问题！');
                } else if (e.status == 404) {
                    message.error('资源不存在！');
                }
            }.bind(this)
        });
    }

    render() {
        var _this = this;
        const columns = [
            {title: '用户名', dataIndex: 'username', key: 'username'}, {
                title: '操作',
                key: 'operation',
                render(text, record){
                    return (
                        <span>
                             <a onClick={_this.handleDelete.bind(_this,record)}>删除</a>
                        </span>
                    );
                }
            }
        ];
        const innerButton = <Button onClick={this.handleSubmit.bind(this)}>添加</Button>;
        return (
            <div>
                <Row>
                    <Col span="8">
                        <CsrfToken />
                        <Input
                            type="text"
                            value={this.state.username}
                            buttonAfter={innerButton}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        className="table"
                    />
                </Row>
            </div>
        );
    }

}

export default ManagerTable;
