/**
 * Created by hard on 16-6-1.
 */
import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';

class EntryInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const forms = ()=> {
            let ret = null;
            if (!!this.props.entry) {
                ret = this.props.entry.formList.map((val, index)=> {
                    return (
                        <TextField
                            key={index}
                            floatingLabelText={val.name}
                            value={val.value}
                            disabled={true}
                            fullWidth={true}
                        />
                    );
                });
            }
            return ret;
        }

        return (
            <div style={this.props.style}>
                {forms()}
            </div>
        )
    }
}

export default EntryInfo;
