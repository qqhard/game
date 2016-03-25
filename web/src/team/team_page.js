import React from 'react';
import TeamForm from '../components/forms/team_form.js';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageHeader from 'react-bootstrap/lib/PageHeader';


class TeamPage extends React.Component {

    render() {
        console.log(this.context);
        return (
            <div>
                <Row>
                    <Col offset="4" span="16">
                        <PageHeader>创建队伍
                            <small>　组队赛事需以队伍参赛</small>
                        </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col offset="4" span="20">
                        <TeamForm />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TeamPage;
