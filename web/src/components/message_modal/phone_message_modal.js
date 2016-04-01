import React from 'react';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import CsrfToken from '../common/csrf_token.js';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

class PhoneMessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            textHelp: '',
            current: 'time'
        }
    }


    handleText(e) {
        var val = this.state.text;
        if (e != null)val = e.target.value;
        if (val.length > 0) {
            this.setState({text: val, textHelp: ''});
            return true;
        } else {
            this.setState({text: val, textHelp: '消息不能为空'});
            return false;
        }
    }

    handleOk() {
        var ok = this.handleText(null);
        if (ok === false)return;

        var text = null;
        if(this.state.current == "time"){
            text = {gamename: this.props.gamename, time: this.state.text};
        }else if(this.state.current == "place") {
            text = {gamename: this.props.gamename, place: this.state.text};
        }

        var body = {
            users: this.props.users.join(','),
            phones: this.props.phones.join(','),
            sender: this.props.username,
            gamename: this.props.gamename,
            type: this.state.current,
            text: text,
            _csrf: $("input[name=_csrf]").val()
        }
        console.log(body);
        $.ajax({
            url: 'message/phone',
            data: body,
            type: 'POST',
            success: function (data) {
                if (data == 'ok') {
                    this.setState({text: '', textHelp: ''});
                    message.success("信息成功发送！");
                    this.props.onCancel();
                } else {
                    message.error("信息成功失败！");
                }
            }.bind(this),
            error: function (e) {
                message.error("信息成功失败！");
            }
        });

    }

    handleConcel() {
        this.setState({text: '', textHelp: ''});
        this.props.onCancel();
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
            text: '',
            textHelp: ''
        });
    }

    render() {

        const timeTextarea = (
            <div className="form-group">
                <label >致全体参赛者，现赛事时间发生变更，具体时间定为</label>
                <textarea className="form-control" value={this.state.text}
                          onChange={this.handleText.bind(this)}></textarea>
                <p>{this.state.textHelp}</p>
            </div>
        );

        const placeTextarea = (
            <div className="form-group">
                <label >致全体参赛者，现赛事地点发生变更，具体地点定为</label>
                <textarea className="form-control" value={this.state.text}
                          onChange={this.handleText.bind(this)}></textarea>
                <p>{this.state.textHelp}</p>
            </div>
        );

        const body = {
            'time': timeTextarea,
            'place': placeTextarea
        };

        return (
            <Modal
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleConcel.bind(this)}>
                <Menu onClick={this.handleClick.bind(this)}
                      selectedKeys={[this.state.current]}
                      mode="horizontal">
                    <Menu.Item key="time">
                        <Icon type="mail"/>时间变更
                    </Menu.Item>
                    <Menu.Item key="place">
                        <Icon type="mail"/>地点变更
                    </Menu.Item>
                </Menu>
                <CsrfToken />
                <div style={{paddingTop:'20px'}}>
                    {body[this.state.current]}
                </div>
            </Modal>
        );
    }
}

export default PhoneMessageModal;