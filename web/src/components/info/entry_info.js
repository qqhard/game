import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class EntryInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var forms = null;
        if(!!this.props.entry&&!!this.props.entry.formList){
            forms = this.props.entry.formList.map(function (val, index) {
                return <h3 key={index}>{`${val.name} : ${val.value}`}</h3>;
            }.bind(this));
        }
        return (
            <Jumbotron>
                <h2>报名成功！</h2><br />
                {forms}
            </Jumbotron>
        );
    }
}

export default EntryInfo;