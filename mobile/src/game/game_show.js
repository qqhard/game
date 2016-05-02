import React from 'react';
import {Link} from 'react-router';

$(document).on('click','.open-briefinfo', function () {
    $.popup('.popup-briefinfo');
});

export default class GameShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        $.init();
    }

    render() {
        return (
            <div>
                <div className="page">
                    <header className="bar bar-nav">
                        <Link className="button button-link button-nav pull-left external" to="home.html">
                            <span className="icon icon-left"></span>
                            返回
                        </Link>
                        <button className="button button-link button-nav pull-right">
                            报名
                            <span className="icon icon-right"></span>
                        </button>
                        <h1 className="title">{this.props.params.gamename}</h1>
                    </header>

                    <div className="content">
                        <div className="content-block-title">赛事基本信息</div>
                        <div className="list-block">
                            <ul>
                                <li className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">名称</div>
                                        <div className="item-after">威海市ACM竞赛</div>
                                    </div>
                                </li>
                                <li className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">简介</div>
                                        <div className="item-after">
                                            <a className="open-briefinfo" data-popup=".popup-briefinfo">Open About Popup </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">参赛限制</div>
                                        <div className="item-after">test
                                        </div>
                                    </div>
                                </li>
                                <li className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">举办者</div>
                                        <div className="item-after">test
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="content-block-title">赛事流程</div>
                        <div className="list-block">
                            <ul>
                                <li className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">开始报名</div>
                                        <div className="item-after">2015年6月 12:00:00</div>
                                    </div>
                                </li>
                                <li className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">截止报名</div>
                                        <div className="item-after">2015年6月 12:00:00</div>
                                    </div>
                                </li>
                                <li className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">赛事结束</div>
                                        <div className="item-after">2015年6月 12:00:00</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="content-padded">
                            <h3>赛事详情</h3>
                            <p>This is a paragraph.This is a paragraph.This is a paragraph.This is a paragraph.This is a paragraph.This is a paragraph.This is a paragraph.This is a paragraph.</p>
                        </div>
                        <div class="content-block">
                            <div className="col-100" style={{padding:'30px'}}>
                                <a href="#" className="button button-big button-fill button-success">前去报名</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popup popup-briefinfo">
                    <div className="content-block">
                        <p>About</p>
                        <p><a href="#" className="close-popup">Close popup</a></p>
                        <p>Lorem ipsum dolor ...</p>
                    </div>
                </div>
            </div>
        );
    }
}
