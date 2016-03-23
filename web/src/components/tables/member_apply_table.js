import React from 'react';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';


class MemberApplyTable extends React.Component {
    handleClick(){

    }
    render() {
        var _this = this;
        const columns = [
            {title: '申请加入的用户', dataIndex: 'username', key: 'username',　width:'70%'},
            {
                title: '操作', dataIndex: '', key: 'x', render(index, record){
                    return (
                        <span>
                            <a onClick={_this.handleClick.bind(_this,record)}>同意</a>
                            <span className="ant-divider"></span>
                             <a onClick={_this.handleClick.bind(_this,record)}>拒绝</a>
                        </span>
                    );
                }
            }
        ];
        return <Table columns={columns} dataSource={this.props.data} size="middle"/>;
    }
}

export default MemberApplyTable;