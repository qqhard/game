import React from 'react'
import { Link } from 'react-router'

class MemberList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        const list = this.props.members.map(function (val,index) {
            return <li key={index} className="list-group-item">{val.username}</li>;
        });
        return (
            <ul className="list-group">
                <h3　className="list-group-item">队伍成员</h3>
                {list}
            </ul>
        );
    }

}

export default MemberList;
