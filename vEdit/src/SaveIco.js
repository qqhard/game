import createIco from './createIco.js';

class SaveIco {
    constructor() {
        var self = createIco("save");
        self.on("click.veditdiv", function (event) {
            event.stopPropagation();

            var test = document.getElementsByTagName('html')[0].outerHTML;
            self.css("cursor", "pointer");
            $.ajax({
                url: window.location.href,
                type: "POST",
                data: {context: test},
                success: function (data) {
                    var gamename = window.location.href.substring(window.location.href.lastIndexOf("/"));
                    var ret = confirm('是否打开赛事宣传页!');
                    if (ret) {
                        window.open('http://' + gamename + '.valseek.com');
                    }
                }
            });
        });
        return self;
    }

}

export default SaveIco;
