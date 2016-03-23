import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import {browserHistory} from 'react-router'
import CsrfToken from '../common/csrf_token.js'
import message from 'antd/lib/message';

const styleLayout = {
    labelClassName: "col-xs-2",
    wrapperClassName: "col-xs-6"
};

class TeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enname: {'data': '', 'valid': null, 'help': null},
            cnname: {'data': '', 'valid': null, 'help': null},
            info: {'data': '', 'valid': null, 'help': null},
            num: {'data': 2, 'valid': null, 'help': null}
        }
    }

    handleEnname(e) {
        var val = this.state.enname;
        if (!!e) val.data = e.target.value;
        var re = /^[a-zA-Z0-9]+$/;


        if (val.data.length == 0) {
            val.valid = 'error';
            val.help = '不能为空';
        } else if (!re.test(val.data)) {
            val.valid = 'error';
            val.help = '只能为字母';
        } else {
            val.valid = 'success';
            val.help = '';
        }
        this.setState({enname: val});
        return val.valid == 'success';
    }

    handleCnname(e) {
        var val = this.state.cnname;
        if (!!e) val.data = e.target.value;
        if (val.data.length == 0) {
            val.valid = 'error';
            val.help = '不能为空';
        } else {
            val.valid = 'success';
            val.help = '';
        }
        this.setState({cnname: val});
        return val.valid == 'success';
    }

    handleInfo(e) {
        var val = this.state.info;
        if (!!e) val.data = e.target.value;
        if (val.data.length == 0) {
            val.valid = 'error';
            val.help = '不能为空';
        } else {
            val.valid = 'success';
            val.help = '';
        }
        this.setState({info: val});
        return val.valid == 'success';
    }

    handleNum(e) {
        var val = this.state.num;
        if (!!e) val.data = e.target.value;
        var re = /^[0-9]+$/;
        if (val.data.length == 0) {
            val.valid = 'error';
            val.help = '不能为空';
        } else if (!re.test(val.data)) {
            val.valid = 'error';
            val.help = '只能是数字';
        } else {
            val.valid = 'success';
            val.help = '';
        }
        this.setState({num: val});
        return val.valid == 'success';
    }

    handleSubmit() {
        var flag = this.handleCnname(null) & this.handleEnname(null) & this.handleNum(null) & this.handleInfo(null);
        if (!flag) return;
        var body = 'enname='+this.state.enname.data
                    +'&cnname='+this.state.cnname.data
                    +'&info='+this.state.info.data
                    +'&num='+this.state.num.data
                    +'&_csrf='+$('input[name=_csrf]').val();
        alert(body);
        $.post('/gameApi/game/team',body,function (data) {
            if(data.status == 'ok'){
                message.success('队伍创建成功！');
                setTimeout(function () {
                    browserHistory.push("/");
                },1000);
            }else{
                message.error('队伍创建失败！');
            }
        }.bind(this)).error(function (e) {
            message.error('队伍创建失败！');
        });
    }

    render() {


        return (

            <form className="form-horizontal">
                <Input type="text" label="英文队名" {...styleLayout}
                       onChange={this.handleEnname.bind(this)}
                       bsStyle={this.state.enname.valid}
                       help={this.state.enname.help}
                />
                <Input type="text" label="中文队名" {...styleLayout}
                       onChange={this.handleCnname.bind(this)}
                       bsStyle={this.state.cnname.valid}
                       help={this.state.cnname.help}
                />
                <Input type="text" label="成员数量" {...styleLayout}
                       onChange={this.handleNum.bind(this)}
                       bsStyle={this.state.num.valid}
                       help={this.state.num.help}
                />
                <Input type="textarea" label="队伍介绍" {...styleLayout}
                       onChange={this.handleInfo.bind(this)}
                       bsStyle={this.state.info.valid}
                       help={this.state.info.help}
                />
                <CsrfToken/>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-6">
                        <Button onClick={this.handleSubmit.bind(this)}>提 交</Button>
                    </div>
                </div>
            </form>
        );
    }

}

export default TeamForm;