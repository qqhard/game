import React from 'react';
import Input from 'react-bootstrap/lib/Input';
// import Button from 'react-bootstrap/lib/Button';

class BelongsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceList: [{'key': 0, 'val': this.props.p.first}],
            provinceid: 0,
            collegeList: [{'key': 0, 'val': this.props.p.first}],
            collegeid: 0,
            instituteList: [{'key': 0, 'val': this.props.p.first}],
            instituteid: 0
        };
    }

    componentDidMount() {
        $.get('/gameApi/provinces', function (data) {
            var arr = [{'key': 0, 'val': this.props.p.first}];
            for (var i = 0; i < data.length; i++) {
                arr.push({'key': data[i].provinceid, 'val': data[i].name});
            }
            this.setState({provinceList: arr});
        }.bind(this), 'json').error(function (e) {
            if (e.status == 403) top.location = '/userApi/auth';
        });

        if (this.props.provinceid > 0) {
            this.setState({provinceid: this.props.provinceid});
            $.get('/gameApi/colleges/' + this.props.provinceid, function (data) {
                var arr = [{'key': 0, 'val': this.props.p.first}];
                for (var i = 0; i < data.length; i++) {
                    arr.push({'key': data[i].collegeid, 'val': data[i].collegename});
                }
                this.setState({collegeList: arr, collegeid: this.props.collegeid});
            }.bind(this));
        }

        if (this.props.collegeid > 0) {
            $.get('/gameApi/institutes/' + this.props.collegeid, function (data) {
                var arr = [{'key': 0, 'val': this.props.p.first}];
                for (var i = 0; i < data.length; i++) {
                    arr.push({'key': data[i].instituteid, 'val': data[i].institutename});
                }
                this.setState({instituteList: arr, instituteid: this.props.instituteid});
            }.bind(this));
        }

        console.log("once" + this.props.provinceid);
    }

    handleSelectProvince(event) {
        var val = event.target.value;
        var text = event.target.options[event.target.selectedIndex].text;
        this.setState({provinceid: val, provincename: text});
        this.props.callbackParent(val, text, 0, this.props.p.first, 0, this.props.p.first);
        var arr = [{'key': 0, 'val': this.props.p.first}];
        if (val > 0) {
            $.get('/gameApi/colleges/' + val, function (data) {
                for (var i = 0; i < data.length; i++) {
                    arr.push({'key': data[i].collegeid, 'val': data[i].collegename});
                }
                this.setState({collegeList: arr, instituteid: arr});
            }.bind(this), 'json');
        } else {
            this.setState({collegeList: arr, instituteid: arr});
        }
    }

    handleSelectCollege(event) {
        var val = event.target.value;
        var text = event.target.options[event.target.selectedIndex].text;
        this.setState({collegeid: val, collegename: text, instituteid: 0, institutename: this.props.p.first});
        this.props.callbackParent(this.state.provinceid, this.state.provincename, val, text, 0, this.props.p.first);
        var arr = [{'key': 0, 'val': this.props.p.first}];
        if (val > 0) {
            $.get('/gameApi/institutes/' + val, function (data) {
                for (var i = 0; i < data.length; i++) {
                    arr.push({'key': data[i].instituteid, 'val': data[i].institutename});
                }
                this.setState({instituteList: arr});
            }.bind(this), 'json');
        } else {
            this.setState({instituteList: arr});
        }

    }

    handleSelectInstitute(event) {
        var val = event.target.value;
        var text = event.target.options[event.target.selectedIndex].text;
        this.setState({instituteid: val, institutename: text});
        this.props.callbackParent(this.state.provinceid, this.state.provincename, this.state.collegeid, this.state.collegename, val, text);
    }

    render() {
        const styleLayout = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-8"
        };
        // const right = {display: 'inline'}
        var provinceOptions = this.state.provinceList.map(function (data, index) {
            return <option key={index} value={data.key}>{data.val}</option>
        });
        var collegeOptions = this.state.collegeList.map(function (data, index) {
            return <option key={index} value={data.key}>{data.val}</option>
        });
        var instituteOptions = this.state.instituteList.map(function (data, index) {
            return <option key={index} value={data.key}>{data.val}</option>
        });

        return (
            <div>
                <Input type="select" {...styleLayout} disabled={this.props.disabled} name="provinceid" label={this.props.p.provincelabel}
                       placeholder="select" value={this.state.provinceid}
                       onChange={this.handleSelectProvince.bind(this)}>
                    {provinceOptions}
                </Input>
                <Input type="select" {...styleLayout} disabled={this.props.disabled} name="collegeid" label={this.props.p.collegelabel}
                       placeholder="select" value={this.state.collegeid} onChange={this.handleSelectCollege.bind(this)}>
                    {collegeOptions}
                </Input>
                <Input type="select" {...styleLayout} disabled={this.props.disabled} name="instituteid" label={this.props.p.institutelabel}
                       placeholder="select" value={this.state.instituteid}
                       onChange={this.handleSelectInstitute.bind(this)}>
                    {instituteOptions}
                </Input>
            </div>

        );
    }
}

export function callbackParent(provinceid, provincename, collegeid, collegename, instituteid, institutename) {
    this.setState({
        provinceid: provinceid,
        provincename: provincename,
        collegeid: collegeid,
        collegename: collegename,
        instituteid: instituteid,
        institutename: institutename
    });
}

export default BelongsForm;
