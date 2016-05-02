import React from 'react';
import {Link} from 'react-router';
import NavBar from '../components/common/nav_bar';

export default class Home extends React.Component {
    render() {
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
                <div className="searchbar row">
                    <div className="search-input col-85">
                        <input type="search" id='search' placeholder='query...'/>
                    </div>
                    <a className="button button-fill button-primary col-15"><span className="icon icon-search"></span></a>
                </div>
                <NavBar />
                <div className="content">
                    <div className="card demo-card-header-pic">
                        <div valign="bottom" className="card-header color-white no-border no-padding">
                            <img className='card-cover'
                                 src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"
                                 alt=""/>
                        </div>
                        <div className="card-content">
                            <div className="card-content-inner">
                                <p className="color-gray">发表于 2015/01/15</p>
                                <p>此处是内容...</p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="link">赞</a>
                            <Link className="link external" to="/gameshow-ggg.html">详情</Link>
                        </div>
                    </div>
                    <div className="card demo-card-header-pic">
                        <div valign="bottom" className="card-header color-white no-border no-padding">
                            <img className='card-cover'
                                 src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"
                                 alt=""/>
                        </div>
                        <div className="card-content">
                            <div className="card-content-inner">
                                <p className="color-gray">发表于 2015/01/15</p>
                                <p>此处是内容...</p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="link">赞</a>
                            <a href="#" className="link">更多</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
