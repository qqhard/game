import React from 'react';
import {Link} from 'react-router';

const ACTIVE = {color: '#0894ec'};

export default class NavBar extends React.Component {
    render(){
        return (
            <nav className="bar bar-tab">
                <Link className="tab-item external"
                      activeStyle={ACTIVE}
                      to="home.html">
                    <span className="icon icon-home"></span>
                    <span className="tab-label">首页</span>
                </Link>
                <Link className="tab-item external"
                      activeStyle={ACTIVE}
                      to="team.html">
                    <span className="icon icon-friends"></span>
                    <span className="tab-label">队伍</span>
                </Link>
                <Link className="tab-item external"
                      activeStyle={ACTIVE}
                      to="message.html">
                    <span className="icon icon-message"></span>
                    <span className="tab-label">私信</span>
                    <span className="badge">2</span>
                </Link>
                <Link className="tab-item external"
                      activeStyle={ACTIVE}
                      to="mine.html">
                    <span className="icon icon-me"></span>
                    <span className="tab-label">设置</span>
                </Link>
            </nav>
        );
    }
}
