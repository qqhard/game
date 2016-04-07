import React from 'react';
import {Row, Col} from 'antd';
import Sider from './../components/sider/sider.js';
import ChecksUnTable from './../components/tables/checks_un_table.js';
import ChecksMyTable from './../components/tables/checks_my_table.js';

const items = ["待审批的", "我审批的"];


class MyChecks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }
    }

    callBack(current) {
        this.setState({current: current});
    }

    render() {

        const right = {
            1: <ChecksUnTable />,
            2: <ChecksMyTable username={this.props.params.username}/>
        };
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


export default MyChecks;
