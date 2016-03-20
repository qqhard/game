import React from 'react'

class GameComment extends React.Component {
    constructor(props) {
        super(props);
    }
    toggleDuoshuoComments(container){
        var el = document.createElement('div');//该div不需要设置class="ds-thread"
        el.setAttribute('data-thread-key', this.props.game.gamename);//必选参数
        el.setAttribute('data-url', window.location);//必选参数
        DUOSHUO.EmbedThread(el);
        jQuery(container).append(el);
    }
    componentDidMount() {
        this.toggleDuoshuoComments($("#game_comment"));
    }
    render() {
        return (
            <div id="game_comment">
            </div>
        )
    }
}

export default GameComment;
