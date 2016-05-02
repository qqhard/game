import React from 'react';
import { browserHistory } from 'react-router';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    handleUsername(e){
        this.setState({username:e.target.value});
    }
    handlePassword(e){
        this.setState({password:e.target.value});
    }
    handleSubmit(e){
        setTimeout(()=>{
            $.toast('登录成功', 1000);
            browserHistory.replace('home.html');
        },1000);
    }
    render() {
        return (
            <div>
                <header className="bar bar-nav">
                    <h1 className='title'>登录</h1>
                </header>
                <div className="content">
                    <div className="list-block" style={{marginTop:'30%'}}>
                        <ul>
                            <li>
                                <div className="item-content">
                                    <div className="item-media"><i className="icon icon-form-name"></i></div>
                                    <div className="item-inner">
                                        <div className="item-title label">姓名</div>
                                        <div className="item-input">
                                            <input type="text"
                                                   value={this.state.username} 
                                                   placeholder="Username"
                                                   onChange={this.handleUsername.bind(this)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="item-content">
                                    <div className="item-media"><i className="icon icon-form-password"></i></div>
                                    <div className="item-inner">
                                        <div className="item-title label">密码</div>
                                        <div className="item-input">
                                            <input type="password"
                                                   value={this.state.password}
                                                   placeholder="Password"
                                                   onChange={this.handlePassword.bind(this)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="content-block">
                        <div className="row">
                            <div className="col-100">
                                <a onClick={this.handleSubmit.bind(this)} className="button button-big button-fill button-info">登录</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
