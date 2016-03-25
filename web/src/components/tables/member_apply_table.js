import React from 'react';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';


class MemberApplyTable extends React.Component {


    handleApprove(record) {
        var url = '/gameApi/game/member/leaaccept/' + record.id;
        var body = '_csrf=' + this.props.csrf;
        $.post(url, body, function (data) {
            if(data == 'ok'){
                message.success("执行成功！");
                this.props.onApprove(record);
            }else{
                message.error(data);
            }
        }.bind(this)).error(function (e) {
            message.error("请求失败，权限问题！");
        });
    }

    handleRefuse(record) {
        var url = '/gameApi/game/member/learefuse/' + record.id;
        var body = '_csrf=' + this.props.csrf;
        $.post(url, body, function (data) {
            if(data == 'ok'){
                message.success("执行成功！");
                this.props.onRefuse(record);
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
            {title: '申请加入的用户', dataIndex: 'username', key: 'username', width: '70%'},
            {
                title: '操作', dataIndex: '', key: 'x', render(index, record){
                return (
                    <span>
                            <a onClick={_this.handleApprove.bind(_this,record)}>同意</a>
                            <span className="ant-divider"></span>
                             <a onClick={_this.handleRefuse.bind(_this,record)}>拒绝</a>
                        </span>
                );
            }
            }
        ];
        return <Table locale={{emptyText:'无人申请'}} columns={columns} dataSource={this.props.data} size="middle"/>;
    }
}

export default MemberApplyTable;