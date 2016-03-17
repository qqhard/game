import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import CsrfToken from './components/common/csrf_token';
import Button from 'react-bootstrap/lib/Button';
import BelongsForm from './components/belong_form/belong_form.js';

class UserinfoPage extends React.Component {
  render() {
    return (
        <UserinfoForm username={this.props.params.username}/>
    );
  }
}

class UserinfoForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone:{'data':'', 'valid':null, 'help':null},
      email:{'data':'', 'valid':null, 'help':null},
      phone:{'data':'', 'valid':null, 'help':null},
      provinceid:0,
      provincename:'',
      collegeid:0,
      collegename:'',
      instituteid:0,
      institutename:''
    };
  }
  componentDidMount(){
    var url = '/userinfo/'+this.props.username;
    $.get(url,function(data){
      console.log(data);
      $("input[name=phone]").val(data.phone);
      $("input[name=email]").val(data.email);
      $("input[name=sociolname]").val(data.sociolname);
      $("input[name=studentid]").val(data.studentid);
    },'json');
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
  handleSubmit(e) {
    e.preventDefault();
    var body = $(e.target).serialize();
    var url = '/userinfo/'+this.props.username;
    console.log(url);
    $.ajax({
       url: url,
       type: 'PUT',
       data:body,
       success: function( data ) {
         console.log(data);
       }
    });
    console.log(body);
  }
  render() {
    const styleLayout = {
      labelClassName:"col-xs-2",
      wrapperClassName:"col-xs-6"
    }
    const right = {display:'inline'}
    const params = {
      'first':'不选择',
      'provincelabel':'省份',
      'collegelabel':'高校',
      'institutelabel':'学院'
    };

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text" name="studentid" label="学号" {...styleLayout} />
        <Input type="text" name="sociolname" label="姓名" {...styleLayout} />
        <Input type="text" name="phone" label="手机" {...styleLayout} />
        <Input type="text" name="email" label="邮件" {...styleLayout} />
        <BelongsForm
          callbackParent={this.callbackParent.bind(this)} params={params}
          provinceid={this.state.provinceid} provincename={this.state.provincename}
          collegeid={this.state.collegeid} collegename={this.state.collegename}
          instituteid={this.state.instituteid} institutename={this.state.institutename}
        />
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


export default UserinfoPage;
