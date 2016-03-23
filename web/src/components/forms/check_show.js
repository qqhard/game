import React from 'react';
import Input from 'react-bootstrap/lib/Input'


class CheckShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount() {
        $.get('/gameApi/gamecheck/' + this.props.gamename, function (data) {
            this.setState({reason: data.reason});
        }.bind(this), 'json');
    }
    render(){
        console.log(this.state);
        return (
            <form>
                <Input type="textarea" label="拒绝理由" disabled={true}  value={this.state.reason} />
            </form>
        );
    }
}

export default CheckShow;