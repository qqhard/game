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
    $.get(user_url,function(data){
      this.setState({
        provinceid:data.provinceid,
        collegeid:data.collegeid,
        instituteid:data.instituteid
      });
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
  handleSubmit(e){
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
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <BelongsForm
          callbackParent={this.callbackParent.bind(this)} p={params}
          provinceid={this.state.provinceid} provincename={this.state.provincename}
          collegeid={this.state.collegeid} collegename={this.state.collegename}
          instituteid={this.state.instituteid} institutename={this.state.institutename}
        />
        <Input type="text" label="手机" {...styleLayout} />
        <Input type="text" label="邮件" {...styleLayout} />
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
