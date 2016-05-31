import React from 'react';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import UserinfoForm from './form/UserinfoForm';
import { title,form } from '../constant/styles';

class UserinfoPage extends React.Component {
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
    render() {
        return (
            <div>
                <AppBar
                    title="用户信息"
                    style={title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <UserinfoForm style={form} onSubmit={this.props.onSubmit}/>
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

export default UserinfoPage;
