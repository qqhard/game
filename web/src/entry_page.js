import React from 'react'
import EntryForm from './components/entry_form/entry_form.js'

class EntryPage extends React.Component {

    render() {
        console.log(this.context);
        return (
            <EntryForm username={this.props.params.username}/>
        )
    }
}

export default EntryPage;
