import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import { browserHistory } from 'react-router';
import CsrfToken from '../common/csrf_token.js';
import BelongsForm from '../belong_form/belong_form.js';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceid:0,
      collegeid:0,
      instituteid:0,
      phone:{'data':'', 'valid':null, 'help':null},
      email:{'data':'', 'valid':null, 'help':null},
      forms:[{'name':'qq','data':'','valid':null,'help':null}]
    };
  }
  componentWillMount(){
    var url = '/userinfo/'+this.props.username;
    $.ajax({
      type:"get",
      url:url,
      dataType: "json",
      async: false,
      success: function(data){
        console.log(data);
        this.setState({
          provinceid:data.provinceid,
          collegeid:data.collegeid,
          instituteid:data.instituteid
        });
      }.bind(this)
    });
  }
  componentDidMount(){
    var user_url = '/userinfo/'+this.props.username;
    var game_url = '/game/'+this.props.gamename;
    $.get(user_url,function(data){
      var phone = this.state.phone;
      var email = this.state.email;
      phone['data'] = data.phone;
      email['data'] = data.email;
      this.setState({
        provinceid:data.provinceid,
        collegeid:data.collegeid,
        instituteid:data.instituteid,
        phone:phone,
        email:email
      });
    }.bind(this));
    $.get(game_url,function(data){
      var forms = data.formList;
      var arr = [];
      for(var i = 0; i < forms.length; i++ ){
        arr.push({'name':forms[i].name,'data':'','valid':null,'help':''});
      }
      this.setState({forms:arr});
    }.bind(this));
  }
  handleUserDefineForm(index, event){
    var val = event.target.value;
    var forms = this.state.forms;
    forms[index]['data'] = val;
    this.setState({forms:forms});
  }
  callbackParent(provinceid,provincename,collegeid,collegename,instituteid,institutename){
    this.setState({
      provinceid:provinceid,
      provincename:provincename,
      collegeid:collegeid,
      collegename:collegename,
      instituteid:instituteid,
      institutename:institutename
    });
  }
  handlePhone(e){
    var phone = this.state.phone;
    if(e != null)phone['data'] = e.target.value;
    if(phone.data.length == 11){
      phone['valid'] = 'success';
      phone['help'] = '';
    }else{
      phone['valid'] = 'error';
      phone['help'] = '手机号码格式错误';
    }
    this.setState({phone:phone});
    if(phone.valid=='success')return true;
    return false;
  }
  handleEmail(e){
    var email = this.state.email;
    if(e != null)email['data'] = e.target.value;
    var re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if(re.test(email.data)){
      email['valid'] = 'success';
      email['help'] = '';
    }else{
      email['valid'] = 'error';
      email['help'] = '电子邮箱格式错误';
    }
    this.setState({email:email});
    if(email.valid=='success')return true;
    return false;
  }

  userDefineFormToStr(){
    var list = this.state.forms;
    var len = list.length;
    var new_lsit = [];
    for(var i = 0;i < len; i++){
      new_lsit.push(list[i].name+"="+list[i].data);
    }
    return new_lsit.join('#');
  }

  handleSubmit(e){
    e.preventDefault();

    var flag = this.handlePhone(null)&this.handleEmail(null);
    if(flag == false)return ;

    var body = 'username='+this.props.username
              +'&gamename='+this.props.gamename
              +'&phone='+this.state.phone.data
              +'&email='+this.state.email.data
              +'&forms='+this.userDefineFormToStr()
              +'&_csrf='+$('input[name=_csrf]').val();
    $.post('/game/entry',body,function(data){
      if(data.status == 'ok')alert('ok');
      else alert(data.data);
    }.bind(this),'json');

    console.log(body);
  }
  render() {
    const styleLayout = {
      labelClassName:"col-xs-2",
      wrapperClassName:"col-xs-6"
    }
    const right = {display:'inline'}
    const forms = this.state.forms.map(function(val,index){
      return <Input type="text" key={index} {...styleLayout}
          label={val.name} value={val.data} onChange={this.handleUserDefineForm.bind(this,index)}/>;
    }.bind(this));
    const params = {
      'first':'不选择',
      'provincelabel':'省份',
      'collegelabel':'高校',
      'institutelabel':'学院'
    };

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <BelongsForm
          callbackParent={this.callbackParent.bind(this)} p={params}
          provinceid={this.state.provinceid} provincename={this.state.provincename}
          collegeid={this.state.collegeid} collegename={this.state.collegename}
          instituteid={this.state.instituteid} institutename={this.state.institutename}
        />
        <Input type="text" label="手机" {...styleLayout} help={this.state.phone.help} bsStyle={this.state.phone.valid} value={this.state.phone.data} onChange={this.handlePhone.bind(this)}/>
        <Input type="text" label="邮件" {...styleLayout} help={this.state.email.help} bsStyle={this.state.email.valid} value={this.state.email.data} onChange={this.handleEmail.bind(this)}/>
        {forms}
        <CsrfToken/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-6">
            <Button type="submit">提交</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default EntryForm;
