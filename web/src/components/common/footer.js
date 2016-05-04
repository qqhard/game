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
                            <dd><a href="mailto:root@acm.hitwh.edu.cn">反馈bug</a></dd>
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
                            <dd><a href="https://lackofdream.github.io" target="_blank">LackOfDream</a></dd>
                            <dd><a href="http://littlebubble.me" target="_blank">little bubble</a></dd>
                        </dl>
                        <dl className="col-sm-3 site-link" id="license">
                            <dt>我们用到的技术</dt>
                            <dd className="tech">
                                <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a><span> </span>
                                <a href="https://jquery.com/" target="_blank">jQuery</a><span> </span>
                                <a href="http://ant.design/" target="_blank">AntDesign</a><span> </span>
                                <a href="https://facebook.github.io/react/" target="_blank">React</a><span> </span>
                                <a href="https://github.com/reactjs/react-router" target="_blank">react-router</a><span> </span>
                                <a href="https://webpack.github.io/" target="_blank">Webpack</a><span> </span>
                                <a href="https://www.docker.com/" target="_blank">Docker</a><span> </span>
                                <a href="http://projects.spring.io/spring-boot/" target="_blank">Spring Boot</a><span> </span>
                                <a href="https://nodejs.org/en/" target="_blank">Node</a><span> </span>
                                <a href="https://www.npmjs.com/" target="_blank">NPM</a><span> </span>
                                <a href="https://babeljs.io/" target="_blank">Bable</a><span> </span>
                                <a href="https://www.mongodb.org/" target="_blank">MongoDB</a><span> </span>
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
