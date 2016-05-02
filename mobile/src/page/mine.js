import React from 'react';
import {Link} from 'react-router';
import NavBar from '../components/common/nav_bar';

export default class Mine extends React.Component {
    render() {
        // fetch('/gameApi/games?state=4',{
        //     credentials: 'same-origin'
        // }).then((response)=>{
        //     return response.json();
        // }).then((json)=>{
        //     console.log('json');
        //     console.log(json);
        // }).catch((error)=>{
        //     console.log('error');
        //     console.log(error);
        // });
        return (
            <div>
                <header className="bar bar-nav">
                    <a className="icon icon-settings pull-left open-panel"></a>
                    <h1 className="title">赛事</h1>
                </header>
                <NavBar />
                <div className="content">
                    <div className="content-block-title">我最近参与的赛事</div>
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
        );
    }
};