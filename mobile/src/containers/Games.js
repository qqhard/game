import { connect } from 'react-redux';
import { getGameEntryedList } from '../actions/get_data';
import Games from '../components/Games';


const mapStateToProps = (state) => {
    return {
        games: state.data.games
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: ()=>dispatch(getGameEntryedList())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Games) 
