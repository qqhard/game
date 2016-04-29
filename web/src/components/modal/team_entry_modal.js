import React from 'react';
import Modal from 'antd/lib/modal';
import Button from 'react-bootstrap/lib/Button';
import message from 'antd/lib/message';
import { browserHistory } from 'react-router';
const confirm = Modal.confirm;



function showConfirm(teamid, csrf) {
    confirm({
        title: '您是否确认队伍报名？',
        content: '队伍报名后，队伍信息将无法修改，请谨慎操作！',
        onOk() {
            const body = {
                teamid:teamid,
                _csrf:csrf
            }
            console.log(body);
            $.post('/gameApi/entry/team',body,(data)=>{
                if(data.status == 'ok'){
                    message.success('队伍报名成功！');
                    browserHistory.replace(`/teamshow-${teamid}.html`);
                }else{
                    message.error('队伍报名失败！');
                }
                
            }).error((e)=>{
                console.log(e);
                message.error('队伍报名失败！'+e.responseText);
            });
        },
        onCancel() {
        }
    });
}


class TeamEntryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if(!this.props.csrf || !this.props.team)return <div></div>;
        return <Button onClick={showConfirm.bind(this,this.props.team.id,this.props.csrf)}>确认报名</Button>;
    }

}

export default TeamEntryModal;