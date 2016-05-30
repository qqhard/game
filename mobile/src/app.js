import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            title: '赛事'
        };
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                {this.props.children}
            </MuiThemeProvider>

        );
    }

}

export default App;

