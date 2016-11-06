/**
 * Created by zhizuqiu on 2016/11/5.
 */

/**
 * server_ip : server's ip
 * server_port : server's port
 * danmu_speed : danmu's speed
 *  keycode : keycode to show the input modal , such :  13 enter , 9 Tab , 36 Home
 */

//////////////////////////////////////
var server_ip = "localhost";
var server_port = "8002";
var danmu_speed = 1;
var keycode = '13';
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
        if(document.getElementById('alert_danmu').style.visibility=='visible'){
            document.getElementById('alert_danmu').style.visibility='hidden';
            if(document.getElementById('insert_danmu').value&&socket_danmu){
                socket_danmu.send(JSON.stringify({
                    'type':'mess',
                    'title':document.title,
                    'danmu':document.getElementById('insert_danmu').value
                }));
            }
        }else{
            document.getElementById('alert_danmu').style.visibility='visible';
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
            console.log('Client received a message',event);
            addDanmu(JSON.parse(event.data)['message']);
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
    div.setAttribute("style", "position: absolute; left: 40%; top: 80%; width: 20%; visibility:hidden; background: white; border:1px solid #999999; padding: 20px;");
    var input = document.createElement("input");
    input.setAttribute("id", "insert_danmu");
    input.setAttribute("type", "text");
    input.setAttribute("style", "width: 80%");
    var button = document.createElement("button");
    button.setAttribute("onclick", "if(socket_danmu) socket_danmu.send(JSON.stringify({'type':'mess','title':document.title,'danmu':document.getElementById('insert_danmu').value}))");
    button.setAttribute("style", "width: 15%");
    button.innerHTML = "submit";
    div.appendChild(input);
    div.appendChild(button);
    parent.appendChild(div);
}
function addDanmu(danmu) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = Math.floor(Math.random()*((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)/2));
    var parent = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    div.setAttribute("name", "danmu");
    div.setAttribute("style", "position:fixed; white-space:nowrap; left:"+w+"; top:"+h+";");
    div.innerHTML = danmu;
    document.getElementById('insert_danmu').value = "";
    parent.appendChild(div);
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