import React from 'react';
import TeamList from '../components/list/team_list.js';
import Row from 'antd/lib/row';


class Teams extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="container">
                <Row>
                    <TeamList url="/gameApi/teams"/>
                </Row>

            </div>

        );
    }
}

export default Teams;
