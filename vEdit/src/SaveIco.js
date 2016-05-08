import createIco from './createIco.js';

class SaveIco {
    constructor() {
        var self = createIco("save");
        self.on("click.veditdiv", function (event) {
            event.stopPropagation();
            const csrf = this.getCookieValue("XSRF-TOKEN");
            var test = document.getElementsByTagName('html')[0].outerHTML;
            self.css("cursor", "pointer");
            $.ajax({
                url: window.location.href,
                type: "POST",
                data: {
                    context: test,
                    _csrf: csrf 
                },
                success: function (data) {
                    var gamename = window.location.href.substring(window.location.href.lastIndexOf("/"));
                    var ret = confirm('是否打开赛事宣传页!');
                    if (ret) {
                        window.open('http://' + gamename + '.valseek.com');
                    }
                }
            });
        }.bind(this));
        return self;
    }

    getCookieValue(cookieName) {
        var cookieValue = document.cookie;
        var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
        if (cookieStartAt == -1) {
            cookieStartAt = cookieValue.indexOf(cookieName + "=");
        }
        if (cookieStartAt == -1) {
            cookieValue = null;
        }
        else {
            cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
            var cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
            if (cookieEndAt == -1) {
                cookieEndAt = cookieValue.length;
            }
            cookieValue = unescape(cookieValue.substring(cookieStartAt, cookieEndAt));//解码latin-1
        }
        return cookieValue;
    }
}

export default SaveIco;
