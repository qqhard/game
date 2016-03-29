import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class UserInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collegename: '',
            institutename: ''
        };
    }
    componentDidMount(){
        var url = `/gameApi/belong/${this.props.data.provinceid}/${this.props.data.collegeid}/${this.props.data.instituteid}`;
        $.get(url,function (data) {
            this.setState(data);
        }.bind(this));
    }
    render() {
        if (!this.props.data )return <Jumbotron></Jumbotron>;
        return (
            <Jumbotron>
                <h2>{this.props.data.username}</h2><br/>
                <h3>姓名：{this.props.data.sociolname}</h3><br/>
                <h3>学号：{this.props.data.studentid}</h3><br/>
                <h3>省份：{this.state.provincename}</h3><br/>
                <h3>学校：{this.state.collegename}</h3><br/>
                <h3>学院：{this.state.institutename}</h3><br/>
            </Jumbotron>
        )
    }
}

export default UserInfo;
