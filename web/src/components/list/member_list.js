import React from 'react'
import { Link } from 'react-router'
import message from 'antd/lib/message';


class MemberList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    handleClick(member){
        alert(this.props.csrf);
        $.ajax({
            url: `/gameApi/member/delete/${member.id}`,
            type: 'POST',
            data: `_csrf=${this.props.csrf}`,
            success: function (data) {
                if(data == "ok"){
                    message.success("执行成功");
                    this.props.onDel(member);
                }else{
                    message.error("执行失败");
                }

            }.bind(this),
            error:  function (e) {
                message.error("执行失败");
            }
        });
    }

    render(){
        const list = this.props.members.map(function (val,index) {
            var aButton = null;
            if(this.props.hasDel){
                aButton = <a className="list-group-item-right" onClick={this.handleClick.bind(this,val)}>清退</a>;
            }
            const userHref = 'userinfoshow-'+val.username +'.html';
            var userShow = <Link to={userHref}>{val.username}</Link>;
            return <li key={index} className="list-group-item">{userShow} {aButton}</li>;
        }.bind(this));
        return (
            <ul className="list-group">
                <h3　className="list-group-item">队伍成员</h3>
                {list}
            </ul>
        );
    }

}

export default MemberList;
