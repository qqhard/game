import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import { browserHistory } from 'react-router'

class CreateGame extends React.Component {

    render() {
        console.log(this.context);
        return (
            <GameForm />
        )
    }
}




class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamename: '',
            briefinfo: '',
            gametime: '',
            gameplace: ''
        };
    }
    handleGamename() { this.setState({gamename: this.refs.gamename.getValue()}) }
    handleBriefinfo() { this.setState({briefinfo: this.refs.briefinfo.getValue()}) }
    handleGametime() { this.setState({gametime: this.refs.gametime.getValue()}) }
    handleGameplace() { this.setState({gameplace: this.refs.gameplace.getValue()}) }
    validGamename() {
        if(this.state.gamename.length < 5
          && this.state.gamename.length > 0) return 'error';
        if(this.state.gamename.length >= 5) return 'success';
    }
    helpGamename() {
        if(this.state.gamename.length < 5
           && this.state.gamename.length>0) return 'gamename 不能少于5位';
    }
    handleSubmit(e) {
        e.preventDefault();
        var gamename= this.state.gamename;
        var body = 'gamename='+this.state.gamename
            +'&briefinfo='+this.state.briefinfo
            +'&gameTime='+this.state.gametime
            +'&gamePlace='+this.state.gameplace
            +'&_csrf='+$('input[name=_csrf]').val();
        console.log(body);
        $.post('/game',body,function(data,statusi,h){
            console.log(data);
            console.log(status);
            console.log(h);
            browserHistory.push('/games.html');
        });
    }
    render() {
        const styleLayout = {
            labelClassName:"col-xs-2",
            wrapperClassName:"col-xs-6",
            hasFeedback:true
        }
        const right = {display:'inline'}
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
                <Input type="text" label="赛事名称" help={this.helpGamename()} {...styleLayout} value={this.state.gamename} bsStyle={this.validGamename()} ref="gamename" onChange={this.handleGamename.bind(this)} />
                <Input type="text" label="赛事简介" {...styleLayout} value={this.state.briefinfo} bsStyle={this.state.briefinfoValid} hasFeedback ref="briefinfo" onChange={this.handleBriefinfo.bind(this)} />
                <Input type="text" label="赛事时间" {...styleLayout} value={this.state.gametime} bsStyle={this.state.gametimeValid} hasFeedback ref="gametime" onChange={this.handleGametime.bind(this)} />
                <Input type="text" label="赛事地点" {...styleLayout} value={this.state.gameplace} bsStyle={this.state.gameplaceValid} hasFeedback ref="gameplace" onChange={this.handleGameplace.bind(this)} />
                <CsrfToken />
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-6">
                        <button type="submit" className="btn btn-default">Sign in</button>
                    </div>
                </div>
            </form>

        );
    }


}

class CsrfToken extends React.Component {
    getCookieValue(cookieName) {
        var cookieValue = document.cookie;
        var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");
        if(cookieStartAt==-1)
        {
            cookieStartAt = cookieValue.indexOf(cookieName+"=");
        }
        if(cookieStartAt==-1)
        {
            cookieValue = null;
        }
        else
        {
            cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;
            var cookieEndAt = cookieValue.indexOf(";",cookieStartAt);
            if(cookieEndAt==-1)
            {
                cookieEndAt = cookieValue.length;
            }
            cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1
        }
        return cookieValue;
    }
    render() {
        return (
            <input type="hidden" name="_csrf" value={this.getCookieValue("XSRF-TOKEN")}/>
        );
    }
}


export default CreateGame;
