import React from 'react';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import RegisterForm from './form/RegisterForm';
import { title,form } from '../constant/styles';

class RegisterPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open:false,
            message:'',
        }
    }
    componentDidMount(){
        $.get("/userApi/username");
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.message.status){
            this.setState({open:true,message:'注册成功，1秒后跳转'});
            setTimeout(()=>{
                this.setState({open:false});
                browserHistory.push('/');
            },1000);
        }else{
            this.setState({open:true,message:'注册失败!'});
            setTimeout(()=>{
                this.setState({open:false});
            },1000);
        }
    }
    render() {
        return (
            <div>
                <AppBar
                    title="注册"
                    style={title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <RegisterForm style={form} onSubmit={this.props.onSubmit}/>
                <Dialog
                    modal={false}
                    open={this.state.open}
                >
                    {this.state.message}
                </Dialog>
            </div>
        )
    }
}

export default RegisterPage;
