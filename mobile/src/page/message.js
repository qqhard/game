import React from 'react';
import {Link} from 'react-router';
import NavBar from '../components/common/nav_bar';

function addItems(number, lastIndex) {
    // 生成新条目的HTML
    var tmp = this.state.messages;
    for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        tmp.push(i);
    }
    this.setState({messages: tmp});

}

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [1, 2, 3],
            hasMore: true,
            loading: false
        }
    }

    componentDidMount() {
        var loading = false;
        // 最多可加载的条目
        var maxItems = 100;

        // 每次加载添加多少条目
        var itemsPerLoad = 20;


        addItems.bind(this)(itemsPerLoad, 0);


        var lastIndex = 20;
    }

    moreButton() {
        if (this.state.hasMore) {
            return (
                <div className="content-block">
                    <div className="row">
                        <div className="col-25">

                        </div>
                        <div className="col-50">
                            <a onClick={this.handleMore.bind(this)} className="button button-fill button-success">提交</a>
                        </div>
                    </div>
                </div>
            )
        }
        return null;
    }

    loading() {
        if (this.state.loading) {
            return (
                <div className="infinite-scroll-preloader">
                    <div className="preloader"></div>
                </div>
            )
        }
        return null;
    }

    handleMore() {
        this.setState({hasMore: false, loading: true});
        setTimeout(()=> {
            addItems.bind(this)(20, 0);
            this.setState({hasMore: true, loading: false});
        }, 1000);
        $.toast("操作失败");
    }

    render() {
        const messages = this.state.messages.map((val, index)=> {
            return (
                <li className="item-content item-link" key={index}>
                    <div className="item-media"><i class="icon icon-f7"></i></div>
                    <div className="item-inner">
                        <div className="item-title">发送者</div>
                        <div className="item-after">消息缩略{index}</div>
                    </div>
                </li>
            )
        })
        return (
            <div>
                <header className="bar bar-nav">
                    <a className="icon icon-settings pull-left open-panel"></a>
                    <h1 className="title">赛事</h1>
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
                    <div className="content infinite-scroll infinite-scroll-bottom" data-distance="100">
                        <div className="list-block">
                            <ul className="list-container">
                                {messages}
                            </ul>
                        </div>
                        {this.moreButton.bind(this)()}
                        {this.loading.bind(this)()}
                    </div>
                </div>
            </div>
        )
    }
}
