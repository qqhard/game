import React from 'react';
import TeamList from '../components/list/team_list.js';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import {Row, Col} from 'antd';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Input from 'react-bootstrap/lib/Input';

class Teams extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <Row>
                    <TeamList prefix={1} url="/gameApi/game/teams"/>
                </Row>

            </div>

        );
    }
}

export default Teams;
