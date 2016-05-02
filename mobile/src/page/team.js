import React from 'react';
import { browserHistory,Link } from 'react-router';
import NavBar from '../components/common/nav_bar';

export default class Team extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <header className="bar bar-nav">
                    <a className="icon icon-settings pull-left open-panel"></a>
                    <h1 className="title">队伍</h1>
                </header>
                <div className="bar bar-header-secondary">
                    <div className="searchbar">
                        <a className="searchbar-cancel">Cancel</a>
                        <div className="search-input">
                            <label className="icon icon-search" for="search"></label>
                            <input type="search" id='search' placeholder='input some query...'/>
                        </div>
                    </div>
                </div>
                <NavBar />
                <div className="content">
                    <div className="card">
                        <div className="card-header">卡头</div>
                        <div className="card-content">
                            <div className="card-content-inner">头和尾的卡片。卡头是用来显示一些额外的信息，或自定义操作卡标题和页脚。</div>
                        </div>
                        <div className="card-footer">卡脚</div>
                    </div>
                    <div className="card">
                        <div className="card-header">卡头</div>
                        <div className="card-content">
                            <div className="card-content-inner">头和尾的卡片。卡头是用来显示一些额外的信息，或自定义操作卡标题和页脚。</div>
                        </div>
                        <div className="card-footer">卡脚</div>
                    </div>
                </div>
            </div>
        );
    }
}
