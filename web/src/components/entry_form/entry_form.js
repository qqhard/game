import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import { browserHistory } from 'react-router';
import CsrfToken from '../common/csrf_token.js';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceid:0,
      provincename:'',
      collegeid:0,
      collegename:'',
      instituteid:0,
      institutename:'',
      phone:{'data':'', 'valid':null, 'help':null},
      email:{'data':'', 'valid':null, 'help':null},
      forms:[{'name':'qq','data':'','valid':null,'help':null}]
    };
  }
  componentDidMount(){
    var user_url = '/userinfo/'+this.props.username;
    $.get(user_url,function(data){
      this.setState({
        provinceid:data.provinceid,
        provincename:data.provincename,
        collegeid:data.collegeid,
        collegename:data.collegename,
        instituteid:data.instituteid,
        institutename:data.institutename
      });
    }.bind(this));
  }
  handleUserDefineForm(index, event){
    var val = event.target.value;
    var forms = this.state.forms;
    forms[index]['data'] = val;
    this.setState({forms:forms});
  }
  handleSubmit(e){
    e.preventDefault();
    console.log('test');
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

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <Input type="text" label="高校" {...styleLayout} disabled={true} value={this.state.collegename}/>
        <Input type="text" label="学院" {...styleLayout} disabled={true} value={this.state.instituteid}/>
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
