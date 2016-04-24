import React from 'react';
import './footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer id="footer">
                <div className="container">
                    <div className="row hidden-xs">
                        <dl className="col-sm-3 site-link">
                            <dt>网站相关</dt>
                            <dd><a href="">关于我们</a></dd>
                            <dd><a href="">反馈bug</a></dd>
                            <dd><a href="">帮助中心</a></dd>
                        </dl>
                        <dl className="col-sm-3 site-link">
                            <dt>联系合作</dt>
                            <dd><a href="">联系我们</a></dd>
                            <dd><a href="">加入我们</a></dd>
                            <dd><a href="">合作伙伴</a></dd>
                        </dl>
                        <dl className="col-sm-3 site-link">
                            <dt>友情链接</dt>
                            <dd><a href="http://nphard.me" target="_blank">hard's blog</a></dd>
                            <dd><a href="https://lackofdream.github.io" target="_blank">lack of dream</a></dd>
                            <dd><a href="http://littlebubble.me" target="_blank">little bubble</a></dd>
                        </dl>
                        <dl className="col-sm-3 site-link" id="license">
                            <dt>我们用到的技术</dt>
                            <dd className="tech">
                                <a href="" target="_blank">Bootstrap</a><span> </span>
                                <a href="" target="_blank">jQuery</a><span> </span>
                                <a href="" target="_blank">AntDesign</a><span> </span> 
                                <a href="" target="_blank">React</a><span> </span>
                                <a href="" target="_blank">react-router</a><span> </span>
                                <a href="" target="_blank">Webpack</a><span> </span>
                                <a href="" target="_blank">Docker</a><span> </span>
                                <a href="" target="_blank">Spring Boot</a><span> </span>
                                <a href="" target="_blank">Node</a><span> </span>
                                <a href="" target="_blank">NPM</a><span> </span>
                                <a href="" target="_blank">Bable</a><span> </span>
                                <a href="" target="_blank">MongoDB</a><span> </span>
                            </dd>
                        </dl>
                    </div>
                    <div className="copyright">
                        Copyright © 2016 Game Factory. 开发中<br/>
                        <a>鄂ICP备 15023719号</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
