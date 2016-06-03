import React from 'react';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Footer from './tab/Footer';

const styles = {
    title : {
        position:'fixed',
        top:'0px',
        left:'0px'
    },
    tab : {
        position:'fixed',
        bottom:'0px',
        width:'100%',
        left:'0px'
    },
    list : {
        paddingBottom:'50px',
        paddingTop:'70px'
    },
    card : {
        marginBottom: '10px'
    },
    cardMedia: {
        padding: '3px'
    }
}

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: ''
        }
    }

    componentDidMount() {
        const {getMessages} = this.props;
        getMessages();
    }

    render() {
        const messages = ()=> {
            let ret = [];
            const {messages} = this.props;
            if (!!messages) {
                ret = messages.map((val, index)=> {
                    const rightIcon = <CommunicationChatBubble
                        onClick={()=>{
                            this.setState({open:true,text:val.text}); 
                    }}/>
                    return <ListItem
                        key={index}
                        primaryText={val.sender}
                        rightIcon={rightIcon}
                        secondaryText={
                            <p>
                                {val.text}
                            </p>
                        }
                    />
                });
            }
            return ret;
        }
        const actions = [
            <FlatButton
                label="关闭"
                primary={true}
                onTouchTap={()=>this.setState({open:false})}
            />
        ];
        return (
            <div>
                <AppBar
                    title="消息"
                    style={styles.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <List style={styles.list}>
                    {messages()}
                </List>
                <Dialog
                    modal={false}
                    autoScrollBodyContent={true}
                    open={this.state.open}
                    actions={actions}
                >
                    {this.state.text}
                </Dialog>
                <Footer index={2}/>
            </div>
        );
    }
}

export default Messages;