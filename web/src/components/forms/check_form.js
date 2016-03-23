import React from 'react';
import CsrfToken from '../common/csrf_token.js';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Input from 'react-bootstrap/lib/Input'
import message from 'antd/lib/message';

class CheckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: '',
            disabled: true,
            step: this.props.step
        };
    }

    componentDidMount() {
        if (this.props.step != 1) {
            $.get('/gameApi/gamecheck/' + this.props.gamename, function (data) {
                this.setState({reason: data.reason});
            }.bind(this), 'json');
        }

    }

    handleChange(e) {
        var val = e.target.value;
        this.setState({reason: val});
        if (val.length > 10) {
            this.setState({
                disabled: false
            });
        } else {
            this.setState({disabled: true});
        }
    }

    serializeForm(accepted){
        var body = 'reason=' + this.state.reason
            + '&accepted=' + accepted
            + '&_csrf=' + $('input[name=_csrf]').val();
        return body;
    }

    handleAccept() {
        var body = this.serializeForm(true);
        $.post('/gameApi/gamecheck/' + this.props.gamename, body, function (data) {
            message.success("审批成功！");
            this.setState({step:2});
        }.bind(this)).error(function (e) {
            message.error("审批出错！");
        });
    }

    handleRefuse() {
        var body = this.serializeForm(false);
        $.post('/gameApi/gamecheck/' + this.props.gamename, body, function (data) {
            message.success("审批成功！");
            this.setState({step:2});
        }.bind(this)).error(function (e) {
            message.error("审批出错！");
        });
    }

    render() {
        if (!this.props.gamename)return <div></div>;
        var check_down = true;
        if (this.state.step == 1) check_down = false;

        return (
            <form>
                <Input type="textarea" label="拒绝理由" disabled={check_down}  value={this.state.reason}
                       onChange={this.handleChange.bind(this)}/>
                <CsrfToken/>
                <div className="form-group">
                    <ButtonGroup>
                        <Button disabled={this.state.disabled||check_down}
                                onClick={this.handleRefuse.bind(this)}>拒绝</Button>
                        <Button disabled={check_down} onClick={this.handleAccept.bind(this)}>通过</Button>
                    </ButtonGroup>
                </div>
            </form>
        )
    }
}

export default CheckForm;