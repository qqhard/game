import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import Button from 'react-bootstrap/lib/Button'
import {browserHistory} from 'react-router'
import CsrfToken from '../common/csrf_token.js'
import message from 'antd/lib/message';

const styleLayout = {
    labelClassName: "col-xs-2",
    wrapperClassName: "col-xs-8"
};

class TeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enname: {data: '', valid: null, help: null},
            cnname: {data: '', valid: null, help: null},
            info: {data: '', valid: null, help: null},
            identity: {data: '队长', valid: null, help: null},
            num: {data: '', valid: null, help: null}
        }
    }

    handleEnname(e) {
        var val = this.state.enname;
        if (!!e) val.data = e.target.value;
        var re = /^[a-zA-Z0-9\s-_]+$/;
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

    handleIdentity(e) {
        var val = this.state.identity;
        if(!!e)val.data = e.target.value;
        val.valid = 'success';
        this.setState({identity: val});
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


    handleSubmit() {
        console.log('teset');
        var flag = this.handleCnname(null) & this.handleEnname(null) & this.handleIdentity(null) & this.handleInfo(null);
        if (!flag) return;
        console.log('teset');
        const body = {
            enname: this.state.enname.data,
            cnname: this.state.cnname.data,
            info: this.state.info.data,
            identity: this.state.identity.data,
            gamename: this.props.gamename,
            _csrf: $('input[name=_csrf]').val()
        }
        console.log(body);
        $.post('/gameApi/team', body, function (data) {
            if (data.status == 'ok') {
                message.success('队伍创建成功！');
                setTimeout(function () {
                    browserHistory.push("/teammanage-" + data.data + ".html");
                }, 1000);
            } else {
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
                       value={this.state.enname.data}
                       help={this.state.enname.help}
                />
                <Input type="text" label="中文队名" {...styleLayout}
                       onChange={this.handleCnname.bind(this)}
                       value={this.state.cnname.data}
                       bsStyle={this.state.cnname.valid}
                       help={this.state.cnname.help}
                />
                <Input type="select" label="您的身份" {...styleLayout}
                       onChange={this.handleIdentity.bind(this)}
                       value={this.state.identity.data}
                       bsStyle={this.state.identity.valid}
                       help={this.state.identity.help}
                >
                    <option value="队长">队长</option>
                    <option value="教练">教练</option>
                    <option value="指导老师">指导老师</option>
                </Input>
                <Input type="textarea" label="队伍介绍" {...styleLayout}
                       onChange={this.handleInfo.bind(this)}
                       value={this.state.info.data}
                       bsStyle={this.state.info.valid}
                       help={this.state.info.help}
                />
                <CsrfToken/>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-8">
                        <Button onClick={this.handleSubmit.bind(this)}>提 交</Button>
                    </div>
                </div>
            </form>
        );
    }

}

export default TeamForm;