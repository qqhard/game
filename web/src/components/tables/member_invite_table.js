import React from 'react';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import Input from 'react-bootstrap/lib/Input'

class MemberInviteTable extends React.Component {
    handleClick(record){
        var url = '/gameApi/game/member/learevoke/' + record.id;
        var body = '_csrf=' + this.props.csrf;
        $.post(url, body, function (data) {
            if(data == 'ok'){
                message.success("执行成功！");
                this.props.onRevoke(record);
            }else{
                message.error(data);
            }
        }.bind(this)).error(function (e) {
            message.error("请求失败，权限问题！");
        });

    }
    render() {
        var _this = this;
        const columns = [
            {title: '邀请加入的用户', dataIndex: 'username', key: 'username',　width:'70%'},
            {
                title: '操作', dataIndex: '', key: 'x', render(index,record){
                return (
                    <span>
                        <a onClick={_this.handleClick.bind(_this,record)}>撤销</a>

                    </span>
                );
            }
            }
        ];
     
        return <Table locale={{emptyText:'快去邀请'}} columns={columns} dataSource={this.props.data} size="middle"/>;
    }
}

export default MemberInviteTable;