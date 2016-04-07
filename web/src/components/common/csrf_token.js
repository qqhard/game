import React from 'react';
import {getCookieValue} from './get_cookie_value.js';

class CsrfToken extends React.Component {
    render() {
        return (
            <input type="hidden" name="_csrf" value={getCookieValue("XSRF-TOKEN")}/>
        );
    }
}
export default CsrfToken;
