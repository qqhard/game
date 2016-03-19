import React from 'react'

class GameComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {game: props.game};
    }

    componentDidMount() {
        window.duoshuoQuery = {short_name: "testlacko"};
        (function () {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0]
            || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
    }

    render() {
        return (
            <div className="ds-thread" data-thread-key={this.state.game.gamename}
                 data-title={this.state.game.gametitle}
                 data-url={window.location}>
            </div>)
    }
}

export default GameComment
