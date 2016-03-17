+function ($) {
    //"我曾经毁了我的一切，只想永远的离开，
    // 我曾经堕入无边黑暗，想挣扎无法自拔。
    // 我曾经像你像他，像那野草野花，
    // 绝望着，也渴望着，也哭也笑 平凡着";
    var operateIco=null;
    var operateBoard=null;

    function createOperIco(pleft,ptop){
        var operIco=$("<a>C</a>");
        operIco.css({
            "opacity":0.6,
            "background-color":"#663300",
            "height":32,
            "width":24,
            "position":"absolute",
            "left":0,
            "top":0,
            "color":"#ffffff",
            "font-size":28
        });
        operIco.attr("class","veditdiv_control_ico");
        return operIco;
    }

    /*"原来你是我最想留住的幸运，原来我们和爱情曾经靠的那么近，
        那为我对抗世界的决心，那那位我淋得雨，
        一幕幕都是你，
        一成不变的真心,与你相遇，好幸运，
        可我已失去为你泪流满面的权利，
        但愿在我看不到的天际，你张开了双翼，遇见你的注定。
     */

    var OperBoard= function(){

        this.isShow=0;
        this.objOperDiv=null;
        var icoHeight=34;
        var objOperBoard=function (){
            var operBoard=$("<div></div>");
            operBoard.css({
                "background-color":"rgba(0,0,0,0.5)",
                "position":"absolute",
                "left":0,
                "border-top-right-radius":10,
                "border-bottom-right-radius":10,
               // "border":"5px dotted #222222",
                "width":0,
                "top":window.innerHeight/2-icoHeight/2,
                "bottom":window.innerHeight/2-icoHeight/2,
                "z-index":1000,
                "padding-right":"8px",
            });
            operBoard.attr("class","veditdiv_control_board");
            operBoard.attr("hidden",true);
            $('body').append(operBoard);
            return operBoard;
        }();

        // "我想摸你的头发只是简单的试探啊，我想给你个拥抱像以前一样可以吗，
        // 你退半步的动作认真的吗，小小的动作伤害那么打，我只想扮演个绅士，才能和你说说话"

        function createIco(instr){
            var hidButton=$("<div>"+ instr +"</div>")
            hidButton.css({
                'height':18,
                'font-size':15,
                "padding":5,
                'display':"inline-block",
                'margin-left':2,
                'margin-top':1,
                'background-color':"rgba(33,33,33,0.4ss)",
                'border' : 'solid 2px #999999',
                "color":"#ffffff",
                "border-radius":5,
                'box-align':"auto",
                "overflow":"auto",
                "margin-top":"auto",
                "margin-buttom":"auto",
            });

            $(document).on('mouseover.veditdiv mouseout.valseek_mouse',hidButton,function(event){
                if(event.type=='mouseover'){
                    hidButton.css("cursor","pointer");
                }
                else if(event.type=="mouseout"){
                    hidButton.css('cursor','auto');
                }
            });
            return hidButton;
        };

        var objHiddenIco=createIco("H");
        var objQuitIco=createIco("Q");
        objOperBoard.append(objHiddenIco);
        objOperBoard.append(objQuitIco);


        objHiddenIco.on("mouseover.veditdiv mouseout.veditdiv",function(event){
            event.stopPropagation();
            if(event.type=="mouseover"){
                objHiddenIco.css("cursor","pointer");
                objOperBoard.css("opacity",0);
            }
            else if(event.type=="mouseout"){
                objHiddenIco.css("cursor","auto");
                objOperBoard.css("opacity",1);
            }
        });

        objQuitIco.on("mouseover.veditdiv mouseout.veditdiv",function(event){
            event.stopPropagation();
            if(event.type=="mouseover"){
                objQuitIco.css("cursor","pointer");
            }
            else if(event.type=="mouseout"){
                objQuitIco.css("cursor","auto");
            }
        });
        var self=this;

        objQuitIco.on("click.veditdiv",function(event,obj){
            event.stopPropagation();
            self.isShow=0;
            self.hiddenBoard();
        });

        var labCss={
            "color":"#ffffff",
            "text-align":"left",
            "font-size":12,
            "margin-top":10,
            "display":"inline-block",
        }

        var objLableText=function(){
            var lableText=$("<div>标签文字内容：</div>");
            lableText.css(labCss);
            lableText.css("width","100%");
            objOperBoard.append(lableText);
            return objLableText;
        }();

        var objInputTextArea=function(){
            var textArea=$("<textarea></textarea>");
            textArea.css({
                "width":"100%",
                "resize":"none",
            });
            textArea.attr("rows",5);
            objOperBoard.append(textArea);
            return textArea;
        }();

        objInputTextArea.on('keyup.veditdiv',function(){
            self.objOperDiv.html(objInputTextArea.val().replace(/ /g,"&nbsp;"));
        });
        // “饿汉，，来条士力架吧，，，，，”

        // 重构 模块化设计
        function textInputBlock(labStr,nameStr,rexfunc){
            var tmpDiv=$("<div></div>")
            var tmplab=$("<label>"+ labStr +"</label>");
            tmplab.css(labCss);
            var tmpinput=$("<input type='text' />");
            tmpinput.attr("name",nameStr);
            tmpinput.css({
                "display":"inline-block",
            });
            tmpinput.attr("class","initdata initpos")
            tmpDiv.append(tmplab);
            tmpDiv.append(tmpinput);
            objOperBoard.append(tmpDiv);

            tmpinput.on("keyup.veditdiv",function(){
                self.objOperDiv.css(nameStr,tmpinput.val());
            });

            tmpinput.on("initData.veditdiv",function(){
                tmpinput.val(self.objOperDiv.css(nameStr));
            });

            tmpinput.on("initPos.veditdiv",function(){
                tmpinput.css("width",objOperBoard.innerWidth()-tmplab.outerWidth()-32);
                //tmpinput.css("left",(tmplab.outerWidth()+4)+"px");
            });

            return tmpinput;
        }
        var objInputWidth=textInputBlock("元素宽度 ：","width",null);
        var objInputHeight=textInputBlock("元素高度 ：","height",null);
        var objInputLeft=textInputBlock("元素左距 ：","left",null);
        var objInputTop=textInputBlock("元素上距 ：","top",null);
        var objInputRight=textInputBlock("元素右距 ：","right",null);
        var objInputBottom=textInputBlock("元素下距 ：","bottom",null);
        var objInputBackgroundColor=textInputBlock("背景颜色 ：","background-color",null);
        var objInputTextColor=textInputBlock("文字颜色 ：","color",null);
        var objInputFontSize=textInputBlock("文字大小 ：","font-size",null);
        var objInputMargin=textInputBlock("总外边距 ：","margin",null);
        var objInputMarginLeft=textInputBlock("左外边距 ：","margin-left",null);
        var objInputMarginRight=textInputBlock("右外边距 ：","margin-right",null);
        var objInputMarginTop=textInputBlock("上外边距 ：","margin-top",null);
        var objInputMarginBottom=textInputBlock("下外边距 ：","margin-bottom",null);
        var objInputPadding=textInputBlock("总内边距 ：","padding",null);
        var objInputPaddingLeft=textInputBlock("左内边距 ：","padding-left",null);
        var objInputPaddingRight=textInputBlock("右内边距 ：","padding-right",null);
        var objInputPaddingTop=textInputBlock("上内边距 ：","padding-top",null);
        var objInputPaddingBottom=textInputBlock("下内边距 ：","padding-bottom",null);
        var objInputBorderRadius=textInputBlock("所有圆角 ：","border-radius",null);
        var objInputBorderRadiusLeftTop=textInputBlock("左上圆角 ：","border-top-left-radius",null);
        var objInputBorderRadiusLeftBottom=textInputBlock("左下圆角 ：","border-bottom-left-radius",null);
        var objInputBorderRadiusRightTop=textInputBlock("右上圆角 ：","border-top-right-radius",null);
        var objInputBorderRadiusRightBottom=textInputBlock("右下圆角 ：","border-bottom-right-radius",null);
        var objInputBorder=textInputBlock("边框属性 ：","border",null);
        var objInputOpacity=textInputBlock("透明度值 ：","opacity",null);

        this.showBoard=function(){
            objOperBoard.attr("hidden",false);
            objOperBoard.css('overflow','auto');
            this.isShow=1;
            objOperBoard.animate(
                {"width":250,},500,
                function(){
                    $(".initpos").trigger("initPos");
                    objOperBoard.animate(
                        {"bottom":0,"top":0},800
                    );
                }
            );
        }

        this.hiddenBoard=function(){
            this.isShow=0;
            //alert((screen.availHeight/2-16)+"xx"+(screen.availHeight/2-16));
            objOperBoard.css('overflow','hidden');
            objOperBoard.animate(
                {"top":window.innerHeight/2-icoHeight/2,"bottom":window.innerHeight/2-icoHeight/2},800,
                function(){
                    objOperBoard.animate(
                        {"width":0},500,function(){
                            objOperBoard.attr("hidden",true);
                        }
                    );
                }
            );
        }

        this.initOperBoard=function(){
            objInputTextArea.val(self.objOperDiv.html().replace(/&nbsp;/g," "));
            $(".initdata").trigger("initData");
            //objInputBackgroundColor.val(self.objOperDiv.css("background-color"));
            //objInputTextColor.val(self.objOperDiv.css("color"));
        }
    }

    //"可惜不是你 陪我到最后  曾一起走却走失那路口";
    $(document).on('click.veditdiv','.veditdiv_control_ico',function(event){
        event.stopPropagation();
        if(operateBoard==null){
            operateBoard=new OperBoard();
        }
        if(operateBoard.isShow==0){
            operateBoard.showBoard();
        }
        operateBoard.objOperDiv= $(this).parent();
        $(this).remove();
        operateBoard.initOperBoard();
    });
    $(document).on('mouseover.veditdiv','.veditdiv',function(event){
        event.stopPropagation();
        if(operateIco != null) operateIco.remove();
        pleft=event.target.offsetLeft;
        ptop=event.target.offsetTop;
        operateIco=createOperIco(pleft,ptop);
        $(event.target).append(operateIco);
    });

    $(document).on('mouseover.veditdiv mouseout.veditdiv','.veditdiv_control_ico',function(event){
        if(event.type == 'mouseover'){
            event.stopPropagation();
            $(event.target).css({
                "cursor": "pointer"
            });
        }
        else if(event.type == 'mouseout'){
            $(event.target).css({
                "cursor":"auto"
            });
        }
    });

    $(document).on('mouseleave.veditdiv','.veditdiv',function(event){
        if(operateIco != null){
            operateIco.remove();
            operateIco=null;
        }
    });

}(jQuery)
