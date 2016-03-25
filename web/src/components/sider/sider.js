import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

class Sider extends React.Component{
    constructor(props){
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
        const items = this.props.items.map(function (data, index) {
            return <Menu.Item key={index+1}>{data}</Menu.Item>;
        });
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