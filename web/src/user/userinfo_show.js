import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import UserInfo from '../components/info/user_info.js';



class UserinfoShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        var url = '/userApi/publicinfo/' + this.props.params.username;
        $.get(url, function (data) {
            console.log(data);
            this.setState({user: data});
        }.bind(this));
    }

    render() {
        if(!this.state.user)return <div></div>;
        return (
            <div>
                <Row>
                    <Col span="16" offset="4">
                        <UserInfo data={this.state.user} hasMessage={true}/>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default UserinfoShow;