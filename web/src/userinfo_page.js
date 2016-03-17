import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import CsrfToken from './components/common/csrf_token';
import Button from 'react-bootstrap/lib/Button';

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
      'provincelabel':'省份',
      'provincefirst':'不选择',
      'collegelabel':'高校',
      'collegefirst':'不选择',
      'institutelabel':'学院',
      'institutefirst':'不选择'
    }
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text" name="studentid" label="学号" {...styleLayout} />
        <Input type="text" name="sociolname" label="姓名" {...styleLayout} />
        <Input type="text" name="phone" label="手机" {...styleLayout} />
        <Input type="text" name="email" label="邮件" {...styleLayout} />
        <BelongsForm callbackParent={this.callbackParent.bind(this)} params={params}/>
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

class BelongsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [{'key':0,'val':this.props.params.provincefirst}],
      provinceid: 0,
      provincename:this.props.params.provincefirst,
      collegeList: [{'key':0,'val':this.props.params.collegefirst}],
      collegeid: 0,
      collegename: this.props.params.collegefirst,
      instituteList: [{'key':0,'val':this.props.params.institutefirst}],
      instituteid: 0,
      institutename: this.props.params.institutefirst
    };
  }
  componentDidMount(){
    $.get('/provinces',function(data){
      var arr = [{'key':0,'val':this.props.params.provincefirst}];
      for(var i = 0;i < data.length; i++){
        arr.push({'key':data[i].provinceid,'val':data[i].name});
      }
      this.setState({provinceList: arr});
    }.bind(this),'json').error(function(e){
        if(e.status == 403) top.location='/login';
    });
  }

  handleSelectProvince(event) {
    var val = event.target.value;
    var text = event.target.options[event.target.selectedIndex].text;
    this.setState({provinceid:val,provincename:text});
    this.props.callbackParent(val,text,0,this.props.params.collegefirst,0,this.props.params.institutefirst);
    var arr = [{'key':0,'val':this.props.params.collegefirst}];
    if(val > 0){
      $.get('/colleges/'+val, function(data){
        for(var i = 0;i < data.length; i++){
          arr.push({'key':data[i].collegeid,'val':data[i].collegename});
        }
        this.setState({collegeList: arr});
      }.bind(this),'json');
    }else{
      this.setState({collegeList: arr});
    }
  }
  handleSelectCollege(event) {
    var val = event.target.value;
    var text = event.target.options[event.target.selectedIndex].text;
    this.setState({collegeid: val,collegename: text, instituteid: 0, institutename:this.props.params.institutefirst});
    this.props.callbackParent(this.state.provinceid,this.state.provincename,val,text,0,this.props.params.institutefirst);
    var arr = [{'key':0,'val':this.props.params.institutefirst}];
    if(val > 0){
      $.get('/institutes/'+val, function(data){
        for(var i = 0;i < data.length; i++){
          arr.push({'key':data[i].instituteid,'val':data[i].institutename});
        }
        this.setState({instituteList: arr});
      }.bind(this),'json');
    }else{
      this.setState({instituteList: arr});
    }

  }
  handleSelectInstitute(event) {
    var val = event.target.value;
    var text = event.target.options[event.target.selectedIndex].text;
    this.setState({instituteid: val,institutename:text});
    this.props.callbackParent(this.state.provinceid,this.state.provincename,this.state.collegeid,this.state.collegename,val,text);
  }
  render() {
    const styleLayout = {
      labelClassName:"col-xs-2",
      wrapperClassName:"col-xs-6"
    }
    const right = {display:'inline'}
    var provinceOptions = this.state.provinceList.map(function(data,index){
      return <option key={index} value={data.key}>{data.val}</option>
    });
    var collegeOptions = this.state.collegeList.map(function(data,index){
      return <option key={index} value={data.key}>{data.val}</option>
    });
    var instituteOptions = this.state.instituteList.map(function(data,index){
      return <option key={index} value={data.key}>{data.val}</option>
    });

    return (
      <div>
        <Input type="select" {...styleLayout} name="provinceid" label={this.props.params.provincelabel} placeholder="select"  onChange={this.handleSelectProvince.bind(this)}>
          {provinceOptions}
        </Input>
        <Input type="select" {...styleLayout} name="collegeid" label={this.props.params.collegelabel} placeholder="select" value={this.state.collegeid} onChange={this.handleSelectCollege.bind(this)}>
          {collegeOptions}
        </Input>
        <Input type="select" {...styleLayout} name="instituteid" label={this.props.params.institutelabel} placeholder="select" value={this.state.instituteid} onChange={this.handleSelectInstitute.bind(this)}>
          {instituteOptions}
        </Input>
      </div>

    );
  }
}

export default UserinfoPage;