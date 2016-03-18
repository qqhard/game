import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import { browserHistory } from 'react-router'
import CsrfToken from '../common/csrf_token.js'

class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamename: {'data': '', 'valid': null, 'help': null},
            gametitle: {'data': '', 'valid': null, 'help': null},
            briefinfo: {'data': '', 'valid': null, 'help': null},
            gametime: {'data': '', 'valid': null, 'help': null},
            gameplace: {'data': '', 'valid': null, 'help': null},
            provinceList: [{'key': 0, 'val': '无限制'}],
            provinceid: 0,
            provincename: '无限制',
            collegeList: [{'key': 0, 'val': '无限制'}],
            collegeid: 0,
            collegename: '无限制',
            instituteList: [{'key': 0, 'val': '无限制'}],
            instituteid: 0,
            institutename: '无限制',
            userDefineForm: [{'data': '', 'valid': null, 'help': null}]
        };
    }


    componentDidMount() {
        var _this = this;
        $.get('/provinces', function (data) {
            var arr = [{'key': 0, 'val': '无限制'}];
            for (var i = 0; i < data.length; i++) {
                arr.push({'key': data[i].provinceid, 'val': data[i].name});
            }
            _this.setState({provinceList: arr});
        }, 'json').error(function (e) {
            if (e.status == 403) top.location = '/login';
        });
    }

    existGamename() {
        var val = this.state.gamename.data;
        var len = val.length;
        if (len < 5 || this.state.gamename.valid == 'error') {
            this.handleGamename();
            return false;
        }
        $.get('/valid/' + val, function (data) {
            console.log(data);
            if (data == true) {
                this.setState({gamename: {'data': val, 'valid': 'error', 'help': '该域名已存在'}});
            } else if (data == false) {
                this.setState({gamename: {'data': val, 'valid': 'success', 'help': ''}});
            }
        }.bind(this));
    }

    handleGamename(e) {
        var val;
        if (e == null) {
            val = this.state.gamename.data;
        } else {
            val = e.target.value;
        }
        var len = val.length;
        var gamename = {'data': val, 'valid': 'error'};
        if (len < 5) {
            gamename['help'] = '位数不能少于5';
            this.setState({gamename: gamename});
            return false;
        }
        var re = new RegExp("^[a-zA-z0-9]+$", "gi");
        if (re.test(val) == false) {
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
        var val;
        if (e == null) {
            val = this.state.gametitle.data;
        } else {
            val = e.target.value;
        }
        var len = val.length;
        var gametitle = {'data': val, 'valid': 'error'};
        if (len < 5) {
            gametitle['help'] = '位数不能少于5';
            this.setState({gametitle: gametitle});
            return false;
        }
        var re = new RegExp("['\"]", "gi");
        if (re.test(val) == true) {
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
        var val;
        if (e == null) {
            val = this.state.briefinfo.data;
        } else {
            val = e.target.value;
        }
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
        return this.state.briefinfo.valid == 'success' || this.state.briefinfo.valid == 'warning';
    }

    handleGametime(e) {
        var val;
        if (e == null) {
            val = this.state.gametime.data;
        } else {
            val = e.target.value;
        }
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
        return this.state.gametime.valid == 'success' || this.state.gametime.valid == 'warning';
    }

    handleGameplace(e) {
        var val;
        if (e == null) {
            val = this.state.gameplace.data;
        } else {
            val = e.target.value;
        }
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
        return this.state.gameplace.valid == 'success' || this.state.gameplace.valid == 'warning';
    }

    handleSelectProvince(e) {
        var val;
        if (e == null) {
            val = this.state.provinceid.data;
        } else {
            val = e.target.value;
        }
        var text = e.target.options[e.target.selectedIndex].text;
        this.setState({
            provinceid: val,
            provincename: text,
            collegeid: 0,
            collegename: '无限制',
            instituteid: 0,
            institutename: '无限制'
        });

        var arr = [{'key': 0, 'val': '无限制'}];
        if (val > 0) {
            $.get('/colleges/' + val, function (data) {
                for (var i = 0; i < data.length; i++) {
                    arr.push({'key': data[i].collegeid, 'val': data[i].collegename});
                }
                this.setState({collegeList: arr});
            }.bind(this), 'json');
        } else {
            this.setState({collegeList: arr});
        }
    }

    handleSelectCollege(event) {
        var val, text;
        if (e == null) {
            val = this.state.collegeid.data;
            text = this.state.collegename;
        } else {
            val = e.target.value;
            text = event.target.options[event.target.selectedIndex].text;
        }
        this.setState({collegeid: val, collegename: text, instituteid: 0, institutename: '无限制'});
        var arr = [{'key': 0, 'val': '无限制'}];
        if (val > 0) {
            $.get('/institutes/' + val, function (data) {
                for (var i = 0; i < data.length; i++) {
                    arr.push({'key': data[i].instituteid, 'val': data[i].institutename});
                }
                this.setState({instituteList: arr});
            }.bind(this), 'json');
        } else {
            this.setState({instituteList: arr});
        }
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
        if (re.test(list[index]['data']) == true) {
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
        this.existGamename();
        return this.state.gamename.valid == 'success' & this.handleGametitle() &
            this.handleBriefinfo() & this.handleGametime() & this.handleGameplace();
    }

    handleSubmit() {
        if (this.validAll() != true)return;

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
            + '&userDefineForm=' + this.userDefineFormToStr()
            + '&_csrf=' + $('input[name=_csrf]').val();
        console.log(body);
        $.post('/game', body, function (data) {
            console.log(data);
            if (data.status === 'ok') {
                browserHistory.push('/games.html');
            } else {

            }

        }, 'json').error(function (e) {
            if (e.status == 403) {
                top.location = '/login';
            } else {
                browserHistory.push('/');
            }
        });
    }

    render() {
        const styleLayout = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-6"
        };
        const right = {display: 'inline'};
        var provinceOptions = this.state.provinceList.map(function (data, index) {
            return <option key={index} value={data.key}>{data.val}</option>
        });
        var collegeOptions = this.state.collegeList.map(function (data, index) {
            return <option key={index} value={data.key}>{data.val}</option>
        });
        var instituteOptions = this.state.instituteList.map(function (data, index) {
            return <option key={index} value={data.key}>{data.val}</option>
        });
        var userDefineForm = this.state.userDefineForm.map(function (data, index) {
            var label = '自定义表单-' + index;
            const innerButton = <Button onClick={this.handleDeleteFiled.bind(this,index)}>删除</Button>;
            return <Input key={index} type="text" {...styleLayout} help={this.state.userDefineForm[index].help}
                          bsStyle={this.state.userDefineForm[index].valid} value={this.state.userDefineForm[index].data}
                          buttonAfter={innerButton} label={label}
                          onChange={this.handleUserDefineForm.bind(this,index)}/>;
        }.bind(this));
        return (
            <form className="form-horizontal">
                <Input type="text" label="赛事域名" {...styleLayout} addonAfter=".domain.com"
                       onBlur={this.existGamename.bind(this)}
                       help={this.state.gamename.help} value={this.state.gamename.data}
                       bsStyle={this.state.gamename.valid} onChange={this.handleGamename.bind(this)}/>
                <Input type="text" label="赛事名称" {...styleLayout}
                       value={this.state.gametitle.data} help={this.state.gametitle.help}
                       bsStyle={this.state.gametitle.valid} onChange={this.handleGametitle.bind(this)}/>
                <Input type="textarea" label="赛事简介" {...styleLayout}
                       value={this.state.briefinfo.data} help={this.state.briefinfo.help}
                       bsStyle={this.state.briefinfo.valid} onChange={this.handleBriefinfo.bind(this)}/>
                <Input type="textarea" label="时间描述" {...styleLayout}
                       value={this.state.gametime.data} help={this.state.gametime.help}
                       bsStyle={this.state.gametime.valid} onChange={this.handleGametime.bind(this)}/>
                <Input type="textarea" label="地点描述" {...styleLayout}
                       value={this.state.gameplace.data} help={this.state.gameplace.help}
                       bsStyle={this.state.gameplace.valid} onChange={this.handleGameplace.bind(this)}/>
                <Input type="select" {...styleLayout} label="省份限制" placeholder="select"
                       onChange={this.handleSelectProvince.bind(this)}>
                    {provinceOptions}
                </Input>
                <Input type="select" {...styleLayout} label="高校限制" placeholder="select" value={this.state.collegeid}
                       onChange={this.handleSelectCollege.bind(this)}>
                    {collegeOptions}
                </Input>
                <Input type="select" {...styleLayout} label="学院限制" placeholder="select" value={this.state.instituteid}
                       onChange={this.handleSelectInstitute.bind(this)}>
                    {instituteOptions}
                </Input>
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
