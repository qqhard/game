var color_red="#cd0000";
var color_yellow="#eead0e";
var color_green="#008d00";
var device_node_default_background_color="#1e90ff";

joint.shapes.topo = {};

joint.shapes.topo.Node =  joint.dia.Element.extend({
    markup:'<g class="rotatable"><g class="scalable"><rect class="card"/><image/></g><text class="devtype"/><text class="name"/></g>',

    defaults: joint.util.deepSupplement({
        type:'topo.Node',
        nid: -1,
        type_id:-1,
        size:{width:-1,height:-1},
       // position:{x:-1,y:-1},
        attrs :{
            '.card': {
                fill: '#ffffff',
                'stroke-width': 0,
                rx: 10,
                ry: 10
            },
            rect:{
                width:-1,height:-1,
                ref:'.rotatable',
                'ref-x':0,
                'ref-y':24

            },
            image:{
                ref:'.card',
                'ref-x':0.1,
                'ref-y':0.1
            },
            '.devtype': {
                'text-decoration': 'underline',
                ref: '.card', 'ref-x': 0, 'ref-y': 1000,
                'font-family': 'Courier New', 'font-size': -1,
                'text-anchor': 'start'
            },

            '.name': {
                'font-weight': '800',
                ref: '.card', 'ref-x':0.1, 'ref-y': 1000,
                'font-size': -1,
                'text-anchor': 'start'
            }
        }
        }, joint.dia.Element.prototype.defaults)
});

var devnode=function(nid,x,y,w,h,devtype,name,image,bgc,type_id,mygraph){
    textcolor="#000000";
    var fontsize=h/5;
    if(fontsize<8)fontsize=8;
    var cell= new joint.shapes.topo.Node({
        size:{width:w,height:h},
        position:{x:x,y:y},
        nid:nid,
        type_id:type_id,
        attrs:{
            rect:{
                width:w,
                height:h,

            },
            '.card':{
                fill:bgc,
                rx:w/10,
                ry:h/10
            },
            image:{'xlink:href': '/static/ico/'+image, opacity: 1,
                width:w*0.8,
                height:h*0.8
            },
            '.devtype': { text: devtype, fill: textcolor,'font-size': fontsize,'ref-y':-(fontsize*2+6), 'letter-spacing': 0},
            '.name': { text: name, fill: textcolor,  'font-size': fontsize,'ref-y':-(fontsize+3),  'letter-spacing': 0 }
        }
    });
    mygraph.addCell(cell);
    return cell;
}

var noderouter=function(nid,x,y,devtype,name,image,mygraph){
    var cell=devnode(nid,x,y,40,40,devtype,name,image,"#1e90ff",2,mygraph);
    return cell;
}

var nodeips=function(nid,x,y,devtype,name,image,mygraph){
    var cell=devnode(nid,x,y,35,35,devtype,name,image,"#1e90ff",4,mygraph);
    return cell;
}

var nodeserver=function(nid,x,y,devtype,name,image,mygraph){
    var cell=devnode(nid,x,y,30,30,devtype,name,image,"#1E90FF",3,mygraph);
    return cell;
}

var firewall=function(nid,x,y,devtype,name,image,mygraph){
    var cell=devnode(nid,x,y,20,40,devtype,name,image,"#1E90FF",5,mygraph);
    return cell;
}

var core_switch=function(nid,x,y,devtype,name,image,mygraph){
    var cell=devnode(nid,x,y,80,50,devtype,name,image,"#1E90FF",1,mygraph);
    return cell;
}

var terminal_switch=function(nid,x,y,devtype,name,image,mygraph){
    var cell=devnode(nid,x,y,50,24,devtype,name,image,'#1e90ff',1,mygraph);
    return cell;
}

var  aggregation_switch=function(nid,x,y,devtype,name,image,mygraph){
    var cell=devnode(nid,x,y,50,50,devtype,name,image,'#1e90ff',1,mygraph);
    return cell;
}

joint.shapes.topo.SolidLine = joint.dia.Link.extend({

    defaults: {
        type: 'topo.SolidLine',
        sid:-1,
        tid:-1,
        connector: { name: 'normal',args: { radius: 2 } },
        source: { selector: '.card' }, target: { selector: '.card' },
        attrs: { '.connection': {stroke: '#585858', 'stroke-width': 1 }},
        z: -1
    }
});

joint.shapes.topo.DottedLine = joint.dia.Link.extend({

    defaults: {
        type: 'topo.DottedLine',
        sid:-1,
        tid:-1,
        connector: { name: 'normal',args: { radius: 2 } },
        source: { selector: '.card' }, target: { selector: '.card' },
        attrs: { '.connection': { 'stroke-dasharray':"5 5",stroke: '#585858', 'stroke-width': 1 }},
        z: -1
    }
});joint.shapes.topo.DircLine = joint.dia.Link.extend({
    defaults: {
        type: 'topo.DircLine',
        sid:-1,
        tid:-1,
        connector: { name: 'normal' },
        source: { selector: '.card' }, target: { selector: '.card' },
        attrs: { '.connection': { stroke: '#585858', 'stroke-width': 1 }},
        z: -1
    }
});

function dottedlink(s_id,t_id,source, target,mygraph, breakpoints) {

    var cell = new joint.shapes.topo.DottedLine({
        sid:s_id,
        tid:t_id,
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints,
        attrs: {
            '.connection': {
                'fill': 'none',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                'stroke': '#4b4a67'
            }
        }

    });
    mygraph.addCell(cell);
    return cell;
}

function dirclink(s_id,t_id,source, target, mygraph,breakpoints) {
    var cell = new joint.shapes.topo.DircLine({
        sid:s_id,
        tid:t_id,
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints,
        attrs: {
            '.connection': {
                'fill': 'none',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                'stroke': '#4b4a67'
            }
        }

    });
    mygraph.addCell(cell);
    return cell;
}

function solidlink(s_id,t_id,source, target,mygraph, breakpoints) {

    var cell = new joint.shapes.topo.SolidLine({
        sid:s_id,
        tid:t_id,
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints,
        attrs: {
            '.connection': {
                'fill': 'none',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                'stroke': '#4b4a67'
            }
        }

    });
    mygraph.addCell(cell);
    return cell;
}

var testrouter=function(nid,x,y,w,h,name,image){
    var cell=devnode(nid,x,y,w,h,"Router",name,"router.png","#436EEE","#000000");
    return cell;
}



joint.shapes.topo.Device = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect class="card"/><image/></g><text class="rank"/><text class="name"/></g>',

    defaults: joint.util.deepSupplement({
        type: 'topo.Device',
        eip:"0.0.0.0",
        nid: 0,
        size: { width: 80, height: 80 },
        attrs: {

            rect: { width: 80, height: 80 },

            '.card': {
                fill: '#FFFFFF', stroke: '#000000', 'stroke-width': 2,
                rx: 10, ry:10
            },

            image: {
                width: 55, height: 55,
                ref: '.card', 'ref-x': 0.1, 'ref-y': 0.2
            },

            '.rank': {
                'text-decoration': 'underline',
                ref: '.card', 'ref-x': 0.9, 'ref-y': 0.01,
                'font-family': 'Courier New', 'font-size': 10,
                'text-anchor': 'end'
            },

            '.name': {
                'font-weight': '800',
                ref: '.card', 'ref-x': 0.9, 'ref-y': 0.15,
                'font-family': 'Courier New', 'font-size': 10,
                'text-anchor': 'end'
            }
        }
    }, joint.dia.Element.prototype.defaults)
});

var device = function(x, y,w,d, rank, name, image, background, textColor,ip) {
    textColor = textColor || "#000";

    var cell = new joint.shapes.topo.Device({
        size: { width: w+1, height: d+1 },
        eip : ip,
        position: { x: x, y: y },
        attrs: {
            rect: { width: w, height: d },
            '.card': { fill: background, stroke: 'none'},
            image: { width : w*0.8 ,height: d*0.7, 'xlink:href': '/static/ico/'+image, opacity: 1 },
            '.rank': { text: rank, fill: textColor,'font-size': d/10, 'letter-spacing': 0},
            '.name': { text: name, fill: textColor, 'word-spacing': '-5px', 'font-size': d/10, 'font-family': 'Arial', 'letter-spacing': 0 }
        }
    });
    graph.addCell(cell);
    return cell;
};

var router =  function(x,y,name,ip){
    var cell= device(x,y,80,80,"Router",name, 'router.png', '#00ff7f',"#000000",ip);
    return cell;
}
var server =  function(x,y,name,ip){
    var cell= device(x,y,100,100,"Server",name, 'server.png', '#00ff7f',"#000000",ip);
    return cell;
}
var switb =  function(x,y,name,ip){
    var cell= device(x,y,100,100,"SwitchBoard",name, 'switch.png', '#00ff7f',"#000000",ip);
    return cell;
}

var bigrouter = function(x,y,name,ip){
    var cell= device(x,y,300,300,"Router",name, 'router.png', '#00ff7f',"#000000",ip);
    return cell;
}


//是否存在指定函数
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
//是否存在指定变量
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            //alert("value is undefined");
            return false;
        } else {
            //alert("value is true");
            return true;
        }
    } catch(e) {}
    return false;
}



var isplay=null;
function alert_play(){
    var audio=document.getElementById("alert_audio");
    if(isplay!=null)clearTimeout(isplay);
    else audio.play();
    isplay=setTimeout('alert_stop()',5000);
}

function alert_stop(){
    var audio=document.getElementById("alert_audio");
    isplay==null;
    audio.pause();
}