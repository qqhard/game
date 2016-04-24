import React from 'react';

class FileDownloadForm extends React.Component {
    render() {
        const href = `/gameApi/${this.props.type}/${this.props.gamename}`;
        return (
            <a className="btn btn-default" target="_blank" href={href}>生成excel</a>
        );
    }
}

export default FileDownloadForm;