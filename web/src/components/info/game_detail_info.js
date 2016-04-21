import React from 'react';

class GameDetailInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
    }
    componentDidMount() {
        const url = `/gameApi/game/detail/${this.props.gamename}`;
        $.get(url, (data)=> {
            console.log(data);
            if(!!data){
                this.setState({text:data.text});
            }
        });
    }

    render() {
        return (
            <div className="form-game-detail" dangerouslySetInnerHTML={{__html: this.state.text}}>
            </div>
        )
    }
}

export default GameDetailInfo;
