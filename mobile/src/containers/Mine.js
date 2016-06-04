import { connect } from 'react-redux';
import Mine from '../components/Mine';
import { getUsername } from '../actions/get_data';

const mapStateToProps = (state) => {
    return {
        username: state.data.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsername: ()=>dispatch(getUsername())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mine) 
