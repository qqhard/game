import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
const styles = {
    title: {
    },
    button: {
        width:'60%'
    }
};

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            open:false,
            message:'',
        }
    }
    componentDidMount(){
        $.get("/userApi/username");
    }  
    componentWillReceiveProps(nextProps){
        if(nextProps.message.status){
            this.setState({open:true,message:'登陆成功，1秒后跳转'});
            setTimeout(()=>{
                this.setState({open:false});
                browserHistory.push('/'); 
            },1000);
        }else{
            this.setState({open:true,message:'登陆失败，用户名或密码错误!'});
            setTimeout(()=>{
                this.setState({open:false});
            },1000);
        }
    }
    handleUsername(e){
        this.setState({username:e.target.value})
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }
    handleSubmit(){
        var {onSubmit} = this.props;
        onSubmit(this.state.username,this.state.password);
    }
    render() {
        return (
            <div>
                <AppBar
                    title="登录"
                    style={styles.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <TextField
                    floatingLabelText="用户名"
                    value={this.state.username}
                    onChange={this.handleUsername.bind(this)}
                />
                <TextField
                    floatingLabelText="密码"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePassword.bind(this)}
                />
                <div style={{textAlign:'center',marginTop:'20px'}}>
                    <RaisedButton
                        label="提交"
                        primary={true}
                        style={styles.button}
                        onClick={this.handleSubmit.bind(this)}
                    />
                </div>
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

export default LoginForm;
