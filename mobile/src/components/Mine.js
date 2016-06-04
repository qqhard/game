import React from 'react';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Footer from './tab/Footer';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ImageNavigateNext from 'material-ui/svg-icons/image/navigate-next';
import Subheader from 'material-ui/Subheader';
import AVPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import AVPauseCircleOutline from 'material-ui/svg-icons/av/pause-circle-outline';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import SocialGroup from 'material-ui/svg-icons/social/group';
import SocialPerson from 'material-ui/svg-icons/social/person';

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
        paddingTop:'70px',
    },
    card : {
        marginBottom: '10px'
    },
    cardMedia: {
        padding: '3px'
    }
}

class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: ''
        }
    }

    componentDidMount() {
        const { getUsername } = this.props;
        getUsername();
    }
    render() {
        const { username } = this.props;
        return (
            <div>
                <AppBar
                    title="消息"
                    style={styles.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <div style={styles.list}>
                    <Card>
                        <CardHeader
                            title={username}
                            avatar={<SocialPerson/>}
                        />
                    </Card>
                    <List>
                        <Subheader>我的赛事</Subheader>
                        <ListItem primaryText="进行中的" leftIcon={<AVPlayCircleOutline/>} rightIcon={<ImageNavigateNext/>} />
                        <ListItem primaryText="结束的" leftIcon={<AVPauseCircleOutline/>} rightIcon={<ImageNavigateNext/>} />
                    </List>
                    <Divider/>
                    <List >
                        <Subheader>我的队伍</Subheader>
                        <ListItem primaryText="加入的" leftIcon={<SocialGroupAdd/>} rightIcon={<ImageNavigateNext/>} />
                        <ListItem primaryText="管理的" leftIcon={<SocialGroup/>} rightIcon={<ImageNavigateNext/>} />
                    </List>
                </div>
                <Dialog
                    modal={false}
                    autoScrollBodyContent={true}
                    open={this.state.open}
                >
                    {this.state.text}
                </Dialog>
                <Footer index={3}/>
            </div>
        );
    }
}

export default Mine;
