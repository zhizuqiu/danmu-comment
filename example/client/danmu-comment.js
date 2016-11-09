/**
 * Created by zhizuqiu on 2016/11/5.
 */

/**
 * server_ip : server's ip
 * server_port : server's port
 * danmu_speed : danmu's speed
 *  keycode : keycode to show the input modal , such :  13 enter , 9 Tab , 36 Home
 *  danmu_style : 0 right to left , 1 tip
 *  danmu_style0_css : set style of font for danmu_style0
 */

//////////////////////////////////////
var server_ip = "localhost";
var server_port = "8002";
var danmu_speed = 1;
var keycode = '13';
var danmu_style = 0;
var danmu_style0_css = "font-family: SimHei; font-weight: 900;  font-size: larger;  color: rgb(102, 102, 102);  text-shadow: 1px 1px rgba(153,153,153, 0.8);";
//////////////////////////////////////

window.onload=function(){
    moveDanmu();
    addInput();
    bindWebsocket();
}
var socket_danmu;
document.onkeydown = function(event_e){
    if(window.event) {
        event_e = window.event;
    }
    var int_keycode = event_e.charCode||event_e.keyCode;
    if( int_keycode == keycode) {
        if(document.getElementById('alert_danmu').style.display=='block'){
            document.getElementById('alert_danmu').style.display='none';
            document.getElementById('danmu_shadow').style.display='none';
            if(document.getElementById('insert_danmu').value&&socket_danmu){
                socket_danmu.send(JSON.stringify({
                    'type':'message',
                    'title':document.title,
                    'danmu':document.getElementById('insert_danmu').value
                }));
            }
        }else{
            document.getElementById('alert_danmu').style.display='block';
            document.getElementById('danmu_shadow').style.display='block';
            document.getElementById('insert_danmu').focus();
        }
    }
};
function bindWebsocket(){
    socket_danmu = new WebSocket('ws://'+server_ip+':'+server_port);
    socket_danmu.onopen = function(event) {
        socket_danmu.send(JSON.stringify({
            'type':'login',
            'title': document.title,
            'danmu': ''
        }));
        socket_danmu.onmessage = function(event) {
            if(danmu_style==0){
                addDanmu_style_0(JSON.parse(event.data)['message']);
            }else if(danmu_style==1){
                addDanmu_style_1(JSON.parse(event.data));
            }

        };
        socket_danmu.onclose = function(event) {
            console.log('Client notified socket has closed',event);
        };
        //socket_danmu.close()
    };
}
function addInput(){
    var parent = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    div.setAttribute("id", "alert_danmu");
    div.setAttribute("style", " z-index: 10001;  position : absolute;  top:70%;  left: 40%;  display: none;  width: 300px;  height: 150px;  line-height: 30px;  padding: 0 2px;  border: 1px solid #ccc;  box-shadow:1px 1px 50px rgba(0,0,0,.3);  color: #333;  background-color: #fff;");
    var div1_1 = document.createElement("div");
    div1_1.setAttribute("style", "padding: 0 80px 0 20px;  height: 42px;  line-height: 42px;  border-bottom: 1px solid #eee;  font-size: 14px;  color: #333;  overflow: hidden;  background-color: #F8F8F8;  border-radius: 2px 2px 0 0");
    div1_1.innerHTML = 'comment';
    var div1_2 = document.createElement("div");
    div1_2.setAttribute("style", "position: relative;  padding: 20px;  line-height: 24px;  word-break: break-all;  overflow: hidden;  font-size: 14px;  overflow-x: hidden;    overflow-y: auto");
    var input = document.createElement("input");
    input.setAttribute("id", "insert_danmu");
    input.setAttribute("type", "text");
    input.setAttribute("style", "display: block;  width: 220px;  height: 30px;  margin: 0 auto;  line-height: 30px;  padding: 0 5px;  border: 1px solid #ccc;  box-shadow: 1px 1px 5px rgba(0, 0, 0, .1) inset;  color: #333");
    div1_2.appendChild(input);
    var div1_3 = document.createElement("div");
    div1_3.setAttribute("style", "text-align: right;");
    var button = document.createElement("button");
    button.setAttribute("onclick", "if(socket_danmu) socket_danmu.send(JSON.stringify({'type':'mess','title':document.title,'danmu':document.getElementById('insert_danmu').value})); document.getElementById('alert_danmu').style.display='none';document.getElementById('danmu_shadow').style.display='none';");
    button.setAttribute("style", "height: 28px;   margin: 0 6px;  padding: 5px 10px;  border: 1px solid #dedede;  background-color: #f1f1f1;  -moz-border-radius: 5px;  -webkit-border-radius: 5px;  border-radius: 5px;  cursor: pointer;border-color: #4898d5;  background-color: #2e8ded;  color: #fff;");
    button.innerHTML = "submit";
    div1_3.appendChild(button);
    if(danmu_style==1){
        var button_remove = document.createElement("button");
        button_remove.setAttribute("onclick", "clear_danmu();document.getElementById('alert_danmu').style.display='none';document.getElementById('danmu_shadow').style.display='none';");
        button_remove.setAttribute("style", "height: 28px;    margin: 0 6px;  padding: 5px 10px;  border: 1px solid #dedede;  background-color: #f1f1f1;  -moz-border-radius: 5px;  -webkit-border-radius: 5px;  border-radius: 5px;  cursor: pointer;background:#C9C5C5;  color: #fff");
        button_remove.innerHTML = "remove";
        div1_3.appendChild(button_remove);
    }
    div.appendChild(div1_1);
    div.appendChild(div1_2);
    div.appendChild(div1_3);
    parent.appendChild(div);


    var div_shadow = document.createElement("div");
    div_shadow.setAttribute("id", "danmu_shadow");
    div_shadow.setAttribute("style", "display: none; position:fixed;_position:absolute;pointer-events:auto;  top:0;left:0;width:100%;height:100%;  z-index:10000; background-color:#000; opacity:0.3; filter:alpha(opacity=30);");
    parent.appendChild(div_shadow);

}
function addDanmu_style_0(danmu) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = Math.floor(Math.random()*((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)/2));
    var parent = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    div.setAttribute("name", "danmu");
    div.setAttribute("style", "position:fixed; white-space:nowrap; left:"+w+"; top:"+h+";"+danmu_style0_css);
    div.innerHTML = danmu;
    document.getElementById('insert_danmu').value = "";
    parent.appendChild(div);
}
var alerts = [];
function addDanmu_style_1(danmu) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var w_ram = Math.floor(Math.random()*w);
    var h_ram = Math.floor(Math.random()*(h/2));
    var parent = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    div.setAttribute("id", 'alert_'+danmu['time']);
    div.setAttribute("style", "position:fixed; white-space:nowrap; left:"+w_ram+"; top:"+h_ram+";"+" display: none;  background-color: #000;  filter: alpha(opacity=60);  background-color: rgba(0, 0, 0, .6);  color: #fff;  border: none;  padding: 12px 25px;  text-align: center;  -moz-border-radius: 2px;  -webkit-border-radius: 2px;  border-radius: 2px;");
    div.innerHTML = danmu['message'];
    document.getElementById('insert_danmu').value = "";
    parent.appendChild(div);
    fadeIn(document.getElementById('alert_'+danmu['time']),300);
    alerts.push({ "id": 'alert_'+danmu['time'] });
}
function moveDanmu() {
    var danmus = document.getElementsByName("danmu");
    for(danmu in danmus){
        if(danmus[danmu].style){
            var w = parseInt(danmus[danmu].style.left);
            w = w-danmu_speed;
            danmus[danmu].style.left=w+"px";
            if (parseInt(danmus[danmu].style.left) < -danmus[danmu].offsetWidth){
                var parent = document.getElementsByTagName("body")[0];
                parent.removeChild(danmus[danmu]);
            }
        }
    }
    setTimeout("moveDanmu()", 5);
}
function fadeIn(el,time){
    if(el.style.opacity === ""){
        el.style.opacity = 0;
    }
    if(el.style.display === "" || el.style.display === 'none'){
        el.style.display = 'block';
    }
    var t = setInterval(function(){
        if(el.style.opacity < 1){
            el.style.opacity = parseFloat(el.style.opacity)+0.01;
        }
        else{
            clearInterval(t);
        }
    },time/100);
}
function clear_danmu(){
    var count = alerts.length;
    for(var i =0 ;i<alerts.length;i++){
        //var parent = document.getElementsByTagName("body")[0];
        //parent.removeChild(document.getElementById(alerts[i].id));
        document.getElementById(alerts[i].id).setAttribute("name","danmu");
    }
    alerts.splice(0, count);
}
