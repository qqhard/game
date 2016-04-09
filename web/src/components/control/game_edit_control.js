import React from 'react';
import './control.scss';
import GameEditModal, {openGameEditModel, closeGameEditModel, updateGame} from '../modal/game_edit_modal.js';

class GameEditControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
    }
    render() {
        return (
            <div className="edit-control" onClick={openGameEditModel.bind(this)}>
                <GameEditModal
                    visible={this.state.visible}
                    game={this.props.game}
                    onCancel={closeGameEditModel.bind(this)}
                    updateGame={this.props.updateGame}
                />
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                <div>修改</div>
            </div>
        );
    }
}

export default GameEditControl;
