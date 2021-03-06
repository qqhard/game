import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Sider from './../components/sider/sider.js';
import MessageSendTable from './../components/tables/message_send_table.js';
import MessageRecvTable from './../components/tables/message_recv_table.js';

const items = ["收信箱", "已发送"];

var right = {
    1: <MessageRecvTable />,
    2: <MessageSendTable />
};
class MyMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }
    }

    componentDidMount() {

    }

    callBack(current) {
        this.setState({current: current});

    }

    render() {

        return (
            <div className="container">
                <Row>
                    <Col key={0} span="4">
                        <Sider callBack={this.callBack.bind(this)} items={items}/>
                    </Col>
                    <Col key={1} span="20">
                        {right[this.state.current]}
                    </Col>

                </Row>
            </div>
        );
    }
}

export default MyMessage;
