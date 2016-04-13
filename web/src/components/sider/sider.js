import React from 'react';
import Menu from 'antd/lib/menu';
import {Link} from 'react-router';

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '1',
            openKeys: []
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1)
        });
        this.props.callBack(e.key);
    }

    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    }

    render() {
        var items = this.props.items.map(function (data, index) {
            return <Menu.Item key={index+1}>{data}</Menu.Item>;
        });
        
        if (!!this.props.aButton) {
            let temp = this.props.aButton;
            let aButton = (
                <Menu.Item key={10}>
                    <Link  key={10} to={temp.href}>{temp.text}</Link>
                </Menu.Item>
            );
            items.push(aButton);
        }
        return (
            <Menu onClick={this.handleClick.bind(this)}
                  openKeys={this.state.openKeys}
                  onOpen={this.onToggle.bind(this)}
                  onClose={this.onToggle.bind(this)}
                  selectedKeys={[this.state.current]}
                  mode="inline">
                {items}
            </Menu>
        );
    }
}

export default Sider;