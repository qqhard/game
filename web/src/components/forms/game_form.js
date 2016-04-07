import React from 'react'
import Input from '../../../node_modules/react-bootstrap/lib/Input'
import ButtonGroup from '../../../node_modules/react-bootstrap/lib/ButtonGroup'
import Button from '../../../node_modules/react-bootstrap/lib/Button'
import {browserHistory} from 'react-router'
import CsrfToken from '../common/csrf_token.js'
import message from 'antd/lib/message';
import BelongsForm, {callbackParent} from '../belong_form/belong_form.js';
import Row from '../../../node_modules/react-bootstrap/lib/Row'
import Col from '../../../node_modules/react-bootstrap/lib/Col'

class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamename: {'data': '', 'valid': null, 'help': null},
            gametitle: {'data': '', 'valid': null, 'help': null},
            briefinfo: {'data': '', 'valid': null, 'help': null},
            gametime: {'data': '', 'valid': null, 'help': null},
            gameplace: {'data': '', 'valid': null, 'help': null},
            team: {'sign': 0, 'num': 1, 'min': 1},
            provinceid: 0,
            provincename: '无限制',
            collegeid: 0,
            collegename: '无限制',
            instituteid: 0,
            institutename: '无限制',
            userDefineForm: [{'data': '', 'valid': null, 'help': null}]
        };
    }

    init(game) {
        var forms = [];
        for (var i in game.formList) {
            forms.push({
                data: game.formList[i].name,
                valid: null,
                help: null
            });
        }
        this.setState({
            gamename: {'data': game.gamename, 'valid': null, 'help': null},
            gametitle: {'data': game.gametitle, 'valid': null, 'help': null},
            briefinfo: {'data': game.briefinfo, 'valid': null, 'help': null},
            gametime: {'data': game.gametime, 'valid': null, 'help': null},
            gameplace: {'data': game.gameplace, 'valid': null, 'help': null},
            provinceid: game.provinceid,
            collegeid: game.collegeid,
            instituteid: game.instituteid,
            userDefineForm: forms
        });
    }

    componentWillMount() {
        if (!!this.props.game)this.init(this.props.game);
    }

    componentDidMount() {
        var _this = this;
        $.get('/gameApi/provinces', function (data) {
            var arr = [{'key': 0, 'val': '无限制'}];
            for (var i = 0; i < data.length; i++) {
                arr.push({'key': data[i].provinceid, 'val': data[i].name});
            }
            _this.setState({provinceList: arr});
        }, 'json').error(function (e) {
            if (e.status == 403) top.location = '/userApi/auth';
        });


    }


    existGamename() {
        var val = this.state.gamename.data;
        var len = val.length;
        if (len < 5 || this.state.gamename.valid == 'error') {
            this.handleGamename();
            return false;
        }
        $.get('/gameApi/valid/' + val, function (data) {
            console.log(data);
            if (data === true) {
                this.setState({gamename: {'data': val, 'valid': 'error', 'help': '该域名已存在'}});
            } else if (data === false) {
                this.setState({gamename: {'data': val, 'valid': 'success', 'help': ''}});
            }
        }.bind(this));
    }

    handleGamename(e) {
        var val = e == null ? this.state.gamename.data : e.target.value;
        var len = val.length;
        var gamename = {'data': val, 'valid': 'error'};
        if (len < 5) {
            gamename['help'] = '位数不能少于5';
            this.setState({gamename: gamename});
            return false;
        }
        var re = /^\w+$/g;
        if (re.test(val) === false) {
            gamename['help'] = '赛事域名只能是字母数字和短横线';
            this.setState({gamename: gamename});
            return false;
        }
        gamename['valid'] = null;
        gamename['help'] = '';
        this.setState({gamename: gamename});
        return true;
    }

    handleGametitle(e) {
        var val = e == null ? this.state.gametitle.data : e.target.value;
        var len = val.length;
        var gametitle = {'data': val, 'valid': 'error'};
        if (len < 5) {
            gametitle['help'] = '位数不能少于5';
            this.setState({gametitle: gametitle});
            return false;
        }
        var re = /['"]/gi;
        if (re.test(val) === true) {
            gametitle['help'] = "赛事名称不得出现特殊符号";
            this.setState({gametitle: gametitle});
            return false;
        }
        gametitle['valid'] = 'success';
        gametitle['help'] = '';
        this.setState({gametitle: gametitle});
        return true;
    }

    handleBriefinfo(e) {
        var val = e == null ? this.state.briefinfo.data : e.target.value;
        var len = val.length;
        var briefinfo = {};
        if (len > 50) {
            briefinfo = {'data': val, 'valid': 'success', 'help': ''};
        } else if (len > 0) {
            briefinfo = {'data': val, 'valid': 'warning', 'help': '赛事简介过短，不利于通过赛事审核'};
        } else {
            briefinfo = {'data': val, 'valid': 'error', 'help': '赛事简介不能为空'};
        }
        this.setState({briefinfo: briefinfo});
        return briefinfo.valid == 'success' || briefinfo.valid == 'warning';
    }

    handleGametime(e) {
        var val = e == null ? this.state.gametime.data : e.target.value;
        var len = val.length;
        var gametime = {};
        if (len > 20) {
            gametime = {'data': val, 'valid': 'success', 'help': ''};
        } else if (len > 0) {
            gametime = {'data': val, 'valid': 'warning', 'help': '赛事的举办时间描述过短不利于通过审核'};
        } else {
            gametime = {'data': val, 'valid': 'error', 'help': '赛事的举办时间描述不能为空'};
        }
        this.setState({gametime: gametime});
        return gametime.valid == 'success' || gametime.valid == 'warning';
    }

    handleGameplace(e) {
        var val = e == null ? this.state.gameplace.data : e.target.value;
        var len = val.length;
        var gameplace = {};
        if (len > 20) {
            gameplace = {'data': val, 'valid': 'success', 'help': ''};
        } else if (len > 0) {
            gameplace = {'data': val, 'valid': 'warning', 'help': '赛事举办地点描述过短不利于通过审核'};
        } else {
            gameplace = {'data': val, 'valid': 'error', 'help': '赛事举办地点描述不能为空'};
        }
        this.setState({gameplace: gameplace});
        return gameplace.valid == 'success' || gameplace.valid == 'warning';
    }

    handleTeamSign(e) {
        var val = this.state.team;
        val.sign = e.target.value;
        if (val.sign == 0) {
            val.num = val.min = 1;
        } else if (val.sign == 1) {
            val.num = val.min = 3;
        } else if (val.sign == 2) {
            val.num = val.min = 1;
        }
        this.setState({team: val});
    }

    handleTeamNum(e) {
        var val = this.state.team;
        if (e != null) val.num = e.target.value;
        this.setState({team: val});
    }

    handleSelectInstitute(event) {
        var val = event.target.value;
        this.setState({instituteid: val, institutename: event.target.options[event.target.selectedIndex].text});
    }

    helpGamename() {
        return this.state.helpGamename;
    }

    handleAddFiled() {
        var formList = this.state.userDefineForm;
        formList.push({'data': '', 'help': '', 'valid': null});
        this.setState({userDefineForm: formList});
    }

    handleDeleteFiled(index) {
        var list = this.state.userDefineForm;
        list.splice(index, 1);
        this.setState({userDefineForm: list});
    }

    handleUserDefineForm(index, e) {
        var list = this.state.userDefineForm;
        if (e == null) {
            list[index]['data'] = this.state.userDefineForm[index]['data'];
        }
        else {
            list[index]['data'] = e.target.value;
        }
        list[index]['help'] = "";
        list[index]['valid'] = "";
        var re = new RegExp("['\"#]", "gi");
        if (re.test(list[index]['data']) === true) {
            list[index]['help'] = "自定义表单不得出现特殊符号";
            list[index]['valid'] = "error";
            this.setState({userDefineForm: list});
            return;
        }
        this.setState({userDefineForm: list});
    }

    userDefineFormToStr() {
        var list = this.state.userDefineForm;
        var len = list.length;
        var new_lsit = [];
        for (var i = 0; i < len; i++) {
            if (list[i].data != null && list[i].data != '') new_lsit.push(list[i].data);
        }
        return new_lsit.join('#');
    }

    validAll() {
        console.log(this.props.disabled);
        if (!this.props.disabled)this.existGamename();
        return (this.state.gamename.valid == 'success' || this.props.disabled) & this.handleGametitle() &
            this.handleBriefinfo() & this.handleGametime() & this.handleGameplace();
    }

    handleSubmit() {
        if (this.validAll() !== true)return;
        var body = 'gamename=' + this.state.gamename.data
            + '&briefinfo=' + this.state.briefinfo.data
            + '&gametitle=' + this.state.gametitle.data
            + '&gametime=' + this.state.gametime.data
            + '&gameplace=' + this.state.gameplace.data
            + '&provinceid=' + this.state.provinceid
            + '&collegeid=' + this.state.collegeid
            + '&instituteid=' + this.state.instituteid
            + '&provincename=' + this.state.provincename
            + '&collegename=' + this.state.collegename
            + '&institutename=' + this.state.institutename
            + '&teamSign=' + this.state.team.sign
            + '&teamNum=' + this.state.team.num
            + '&userDefineForm=' + this.userDefineFormToStr()
            + '&_csrf=' + $('input[name=_csrf]').val();
        console.log(body);

        if (!this.props.game)this.postForm(body);
        else this.putForm(body);

    }

    postForm(body) {
        var _this = this;
        $.post('/gameApi/game', body, function (data) {
            console.log(data);
            if (data.status === 'ok') {
                message.success("赛事提交成功，等待管理员审批！")
                setTimeout(function () {
                    browserHistory.push('/gamesubmited-' + _this.state.gamename.data + '.html');
                }, 1500);
            } else {
                message.error("赛事提交失败！")
            }

        }, 'json').error(function (e) {
            message.error("赛事提交失败！")
            if (e.status == 403) {
                top.location = '/userApi/auth';
            } else {
                browserHistory.push('/');
            }
        });
    }

    putForm(body) {
        var _this = this;
        $.ajax({
            url: '/gameApi/game/' + this.state.gamename.data,
            method: 'PUT',
            data: body,
            success: function (data) {
                if (data.status == 'ok') {
                    message.success("赛事提交成功，等待管理员审批！")
                    setTimeout(function () {
                        browserHistory.push('/gamesubmited-' + _this.state.gamename.data + '.html');
                    }, 1500);
                } else {
                    message.error("赛事提交失败！")
                }
            },
            error: function (e) {
                message.error("赛事提交失败！")
            }
        });
    }

    render() {
        const styleLayout = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-6"
        };

        // const right = {display: 'inline'};
        var userDefineForm = this.state.userDefineForm.map(function (data, index) {
            var label = '自定义表单-' + index;
            const innerButton = <Button onClick={this.handleDeleteFiled.bind(this,index)}>删除</Button>;
            return <Input key={index} type="text" {...styleLayout} help={this.state.userDefineForm[index].help}
                          bsStyle={this.state.userDefineForm[index].valid} value={this.state.userDefineForm[index].data}
                          buttonAfter={innerButton} label={label}
                          onChange={this.handleUserDefineForm.bind(this,index)}/>;
        }.bind(this));
        const params = {
            'first': '无限制',
            'provincelabel': '限制省份',
            'collegelabel': '限制高校',
            'institutelabel': '限制学院'
        };

        return (
            <form className="form-horizontal">

                <Input type="text" label="赛事域名" disabled={this.props.disabled} {...styleLayout} addonAfter=".domain.com"
                       onBlur={this.existGamename.bind(this)}
                       help={this.state.gamename.help} value={this.state.gamename.data}
                       bsStyle={this.state.gamename.valid} onChange={this.handleGamename.bind(this)}/>
                <Input type="text" label="赛事名称" {...styleLayout}
                       value={this.state.gametitle.data} help={this.state.gametitle.help}
                       onChange={this.handleGametitle.bind(this)}
                       bsStyle={this.state.gametitle.valid}
                       onBlur={this.handleGametitle.bind(this)}/>
                <Input type="textarea" label="赛事简介" {...styleLayout}
                       value={this.state.briefinfo.data} help={this.state.briefinfo.help}
                       onChange={this.handleBriefinfo.bind(this)}
                       bsStyle={this.state.briefinfo.valid} onBlur={this.handleBriefinfo.bind(this)}/>
                <Input type="textarea" label="时间描述" {...styleLayout}
                       value={this.state.gametime.data} help={this.state.gametime.help}
                       onChange={this.handleGametime.bind(this)}
                       bsStyle={this.state.gametime.valid} onBlur={this.handleGametime.bind(this)}/>
                <Input type="textarea" label="地点描述" {...styleLayout}
                       value={this.state.gameplace.data} help={this.state.gameplace.help}
                       onChange={this.handleGameplace.bind(this)}
                       bsStyle={this.state.gameplace.valid} onBlur={this.handleGameplace.bind(this)}/>
                <Input label="队伍人数" {...styleLayout}>
                    <Row>
                        <Col xs={6}>
                            <Input type="select" placeholder="select"
                                   onChange={this.handleTeamSign.bind(this)}
                                   value={this.state.team.sign}>
                                <option value="0">=</option>
                                <option value="1">&lt;</option>
                                <option value="2">&gt;</option>
                            </Input>
                        </Col>
                        <Col xs={6}>
                            <Input type="number" min={this.state.team.min}
                                   value={this.state.team.num}
                                   onChange={this.handleTeamNum.bind(this)}
                                   className="form-control"/>
                        </Col>
                    </Row>
                </Input>

                <BelongsForm
                    callbackParent={callbackParent.bind(this)} p={params}
                    provinceid={this.state.provinceid}
                    collegeid={this.state.collegeid}
                    instituteid={this.state.instituteid}
                />
                <CsrfToken/>
                {userDefineForm}
                <div className="form-group">
                    <div className="col-sm-offset-4 col-sm-6">
                        <ButtonGroup bsSize="large">
                            <Button onClick={this.handleAddFiled.bind(this)}>增加</Button>
                            <Button onClick={this.handleSubmit.bind(this)}>提交</Button>
                        </ButtonGroup>

                    </div>
                </div>
            </form>

        );
    }
}
export default GameForm;
