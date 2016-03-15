import React from 'react'
import GameForm from './components/game_form/game_form.js'

class CreateGame extends React.Component {

    render() {
        console.log(this.context);
        return (
            <GameForm />
        )
    }
}

export default CreateGame;
