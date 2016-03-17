import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';

class BelongsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [{'key':0,'val':this.props.params.first}],
      provinceid: 0,
      provincename:this.props.params.first,
      collegeList: [{'key':0,'val':this.props.params.first}],
      collegeid: 0,
      collegename: this.props.params.first,
      instituteList: [{'key':0,'val':this.props.params.first}],
      instituteid: 0,
      institutename: this.props.params.first
    };
  }
  componentDidMount(){
    $.get('/provinces',function(data){
      var arr = [{'key':0,'val':this.props.params.first}];
      for(var i = 0;i < data.length; i++){
        arr.push({'key':data[i].provinceid,'val':data[i].name});
      }
      this.setState({provinceList: arr});
    }.bind(this),'json').error(function(e){
        if(e.status == 403) top.location='/login';
    });

    if(this.props.provinceid > 0){
      this.setState({provinceid:this.props.provinceid,provincename:this.props.provincename});
    }
  }

  handleSelectProvince(event) {
    var val = event.target.value;
    var text = event.target.options[event.target.selectedIndex].text;
    this.setState({provinceid:val,provincename:text});
    this.props.callbackParent(val,text,0,this.props.params.first,0,this.props.params.first);
    var arr = [{'key':0,'val':this.props.params.first}];
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
    this.setState({collegeid: val,collegename: text, instituteid: 0, institutename:this.props.params.first});
    this.props.callbackParent(this.state.provinceid,this.state.provincename,val,text,0,this.props.params.first);
    var arr = [{'key':0,'val':this.props.params.first}];
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
        <Input type="select" {...styleLayout} name="provinceid" label={this.props.params.provincelabel} placeholder="select" value={this.state.provinceid} onChange={this.handleSelectProvince.bind(this)}>
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

export default BelongsForm;
