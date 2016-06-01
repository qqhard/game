import { connect } from 'react-redux';
import { getTeamEntryedList } from '../actions/get_data';
import Teams from '../components/Teams';

const mapStateToProps = (state) => {
    return {
        teams: state.data.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: ()=>dispatch(getTeamEntryedList())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teams) 
