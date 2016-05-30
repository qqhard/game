import {connect} from 'react-redux';
import {getGame,getGameDetail} from '../actions/get_data';
import GameDetail from '../components/GameDetail';


const mapStateToProps = (state) => {
    return {
        game: state.game.game,
        gameDetail: state.game.gameDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (gamename)=>dispatch(getGame(gamename)),
        getGameDetail: (gamename)=>dispatch(getGameDetail(gamename))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameDetail) 
