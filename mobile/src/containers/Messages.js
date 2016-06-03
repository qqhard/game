import { connect } from 'react-redux';
import Messages from '../components/Messages';
import { getMessages } from '../actions/get_data';

const mapStateToProps = (state) => {
    return {
        messages: state.messages.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: ()=>dispatch(getMessages())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages) 
