import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { browserHistory } from 'react-router'

class CreateGame extends React.Component {

    render() {
        console.log(this.context);
        return (
            <GameForm />
        )
    }
}


class GameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamename: {'data':'', 'valid':null, 'help':''},
      gametitle: '',
      briefinfo: '',
      gametime: '',
      gameplace: '',
      provinceList: [{'key':0,'val':'无限制'}],
      provinceid: 0,
      collegeList: [{'key':0,'val':'无限制'}],
      collegeid: 0,
      instituteList: [{'key':0,'val':'无限制'}],
      instituteid: 0,
      userDefineForm: [''],
      validGametitle: null,
      helpGametitle: ''
    };
  }
  componentDidMount(){
    var _this = this;
    $.get('/provinces',function(data){
      var arr = [{'key':0,'val':'无限制'}];
      for(var i = 0;i < data.length; i++){
        arr.push({'key':data[i].provinceid,'val':data[i].name});
      }
      _this.setState({provinceList: arr});
    },'json');
  }

  handleGamename(e) {
    var val = e.target.value;
    var len = val.length;
    var gamename = {'data':val,'valid':'error'};
    if(len < 5 && len > 0) {
      gamename['help'] = '位数不能少于5';
      this.setState({gamename:gamename});
      return ;
    }
    var re = new RegExp("^[a-zA-z0-9]+$","gi");
    if(len > 0 && re.test(val) == false ){
      gamename['help'] = '赛事域名只能是字母数字和短横线';
      this.setState({gamename:gamename});
      return ;
    }
    gamename['valid'] = null;
    gamename['help'] = '';
    this.setState({gamename:gamename});
  }
  handleGametitle(e) {
    var val = e.target.value;
    var len = val.length;
    if(len < 5 && len > 0) {
      this.setState({gametitle:val, validGametitle:'error', helpGametitle:'位数不能少于5'});
      return ;
    }
    var re = new RegExp("['\"]","gi");
    if(len > 0 && re.test(val) == true ){
      this.setState({gametitle:val, validGametitle:'error', helpGametitle:'赛事名称不得出现特殊符号'});
      return ;
    }
    this.setState({gametitle:val, validGametitle:'success' ,helpGametitle:''});
  }
  handleBriefinfo() {
    this.setState({briefinfo: this.refs.briefinfo.getValue()})
  }
  handleGametime() { this.setState({gametime: this.refs.gametime.getValue()}) }
  handleGameplace() { this.setState({gameplace: this.refs.gameplace.getValue()}) }

  handleSelectProvince(event) {
    var _this = this;
    var val = event.target.value;
    _this.setState({provinceid: val, collegeid: 0, instituteid: 0});

    var arr = [{'key':0,'val':'无限制'}];
    if(val > 0){
      $.get('/colleges/'+val, function(data){
        for(var i = 0;i < data.length; i++){
          arr.push({'key':data[i].collegeid,'val':data[i].collegename});
        }
        _this.setState({collegeList: arr});
      },'json');
    }else{
      _this.setState({collegeList: arr});
    }
  }
  handleSelectCollege(event) {
    var _this = this;
    var val = event.target.value;
    _this.setState({collegeid: val, instituteid: 0});
    var arr = [{'key':0,'val':'无限制'}];
    if(val > 0){
      $.get('/institutes/'+val, function(data){
        for(var i = 0;i < data.length; i++){
          arr.push({'key':data[i].instituteid,'val':data[i].institutename});
        }
        _this.setState({instituteList: arr});
      },'json');
    }else{
      _this.setState({instituteList: arr});
    }
  }
  handleSelectInstitute(event) {
    var val = event.target.value;
    this.setState({instituteid: val});
  }

  validGamename() {
    var len = this.state.gamename.length;
    if(len < 5 && len > 0) {

      return 'error';
    }
  }
  helpGamename(){
    return this.state.helpGamename;
  }
  handleAddFiled() {
    var formList = this.state.userDefineForm;
    formList.push('');
    this.setState({userDefineForm: formList});
  }
  handleDeleteFiled(index, event) {
    var list = this.state.userDefineForm;
    list.splice(index, 1);
    this.setState({userDefineForm: list});
  }
  handleUserDefineForm(index, event) {
    var list = this.state.userDefineForm;
    list[index] = event.target.value;
    this.setState({userDefineForm: list});
  }
  validAll() {
    if(this.validGamename() != 'success')return false;
    return true;
  }
  handleSubmit(type, event) {
    console.log(this.validAll());
    var body = 'gamename='+this.state.gamename
    +'&briefinfo='+this.state.briefinfo
    +'&gametime='+this.state.gametime
    +'&gameplace='+this.state.gameplace
    +'&_csrf='+$('input[name=_csrf]').val();
    console.log(body);
    $.post('/game',body,function(data){
      console.log(data);
      if(data.status === 'ok'){
        browserHistory.push('/games.html');
      }else {

      }

    },'json').error(function(e){
      if(e.status == 403){
        top.location='/login';
      }else{
        browserHistory.push('/');
      }
    });
  }

    render() {
      const styleLayout = {
        labelClassName:"col-xs-2",
        wrapperClassName:"col-xs-6"
      }
      const right = {display:'inline'}
      var provinceOptions = this.state.provinceList.map(function(data){
        return <option value={data.key}>{data.val}</option>
      });
      var collegeOptions = this.state.collegeList.map(function(data){
        return <option value={data.key}>{data.val}</option>
      });
      var instituteOptions = this.state.instituteList.map(function(data){
        return <option value={data.key}>{data.val}</option>
      });
      var userDefineForm = this.state.userDefineForm.map(function(data, index){
        var label = '自定义表单-'+index;
        const innerButton = <Button onClick={this.handleDeleteFiled.bind(this,index)}>删除</Button>;
        return <Input type="text" {...styleLayout} value={this.state.userDefineForm[index]} buttonAfter={innerButton} label={label} onChange={this.handleUserDefineForm.bind(this,index)}/>;
      }.bind(this));
      return (
        <form className="form-horizontal">
          <Input type="text" label="赛事域名" help={this.state.gamename.help} {...styleLayout} value={this.state.gamename.data}  bsStyle={this.state.gamename.valid} onChange={this.handleGamename.bind(this)} addonAfter=".domain.com"/>
          <Input type="text" label="赛事名称" {...styleLayout} value={this.state.gametitle} help={this.state.helpGametitle} bsStyle={this.state.validGametitle} onChange={this.handleGametitle.bind(this)} />
          <Input type="textarea" label="赛事简介"  help="success" {...styleLayout} value={this.state.briefinfo} bsStyle={this.state.briefinfoValid} hasFeedback ref="briefinfo" onChange={this.handleBriefinfo.bind(this)} />
          <Input type="textarea" label="时间描述" {...styleLayout} value={this.state.gametime} bsStyle={this.state.gametimeValid} hasFeedback ref="gametime" onChange={this.handleGametime.bind(this)} />
          <Input type="textarea" label="地点描述" {...styleLayout} value={this.state.gameplace} bsStyle={this.state.gameplaceValid} hasFeedback ref="gameplace" onChange={this.handleGameplace.bind(this)} />
          <Input type="select" {...styleLayout} label="省份限制" placeholder="select"  onChange={this.handleSelectProvince.bind(this)}>
            {provinceOptions}
          </Input>
          <Input type="select" {...styleLayout} label="高校限制" placeholder="select" value={this.state.collegeid} onChange={this.handleSelectCollege.bind(this)}>
            {collegeOptions}
          </Input>
          <Input type="select" {...styleLayout} label="学院限制" placeholder="select" value={this.state.instituteid} onChange={this.handleSelectInstitute.bind(this)}>
            {instituteOptions}
          </Input>
          <CsrfToken/>
          {userDefineForm}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
                <ButtonGroup  bsSize="large">
                  <Button onClick={this.handleAddFiled.bind(this)}>增加</Button>
                  <Button onClick={this.handleSubmit.bind(this,0)}>暂存</Button>
                  <Button onClick={this.handleSubmit.bind(this,1)}>提交</Button>
                </ButtonGroup>

            </div>
          </div>
        </form>

      );
    }


}

class CsrfToken extends React.Component {
    getCookieValue(cookieName) {
        var cookieValue = document.cookie;
        var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");
        if(cookieStartAt==-1)
        {
            cookieStartAt = cookieValue.indexOf(cookieName+"=");
        }
        if(cookieStartAt==-1)
        {
            cookieValue = null;
        }
        else
        {
            cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;
            var cookieEndAt = cookieValue.indexOf(";",cookieStartAt);
            if(cookieEndAt==-1)
            {
                cookieEndAt = cookieValue.length;
            }
            cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1
        }
        return cookieValue;
    }
    render() {
        return (
            <input type="hidden" name="_csrf" value={this.getCookieValue("XSRF-TOKEN")}/>
        );
    }
}


export default CreateGame;
