import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Static from 'react-bootstrap/lib/FormControls/Static';

class GameCheckInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.data.formList);
        if (this.props.data == '')return <Jumbotron></Jumbotron>;
        const style = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-10"
        }
        const infoList = [
            {'label': '赛事域名', 'name': 'gamename'},
            {'label': '赛事名称', 'name': 'gametitle'},
            {'label': '赛事简介', 'name': 'briefinfo'},
            {'label': '比赛时间', 'name': 'gametime'},
            {'label': '比赛地点', 'name': 'gameplace'},
            {'label': '省份限制', 'name': 'provincename'},
            {'label': '高校限制', 'name': 'collegename'},
            {'label': '学院限制', 'name': 'institutename'}
        ].map(function (val, index) {
            return <Static {...style} label={val.label} value={this.props.data[val.name]}/>;
        }.bind(this));
        const formList = this.props.data.formList.map(function (val, index) {
            return <Static {...style} label={"自定义表单" + index} value={val.name}/>;
        });

        return (

            <form className="form-horizontal">
                {infoList}
                {formList}
            </form>

        )
    }
}

export default GameCheckInfo;
