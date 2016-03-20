import React from 'react'

class GameComment extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var _this = this;
        function toggleDuoshuoComments(container){
            var el = document.createElement('div');//该div不需要设置class="ds-thread"
            el.setAttribute('data-thread-key', _this.props.game.gamename);//必选参数
            el.setAttribute('data-url', window.location);//必选参数
            DUOSHUO.EmbedThread(el);
            jQuery(container).append(el);
        }
        toggleDuoshuoComments($("#game_comment"));

    }

    render() {
        return (
            <div id="game_comment">
            </div>
        )
    }
}

export default GameComment;
