/**
 * @author zhizuqiu <994490929@qq.com>
 * version: 1.1.0
 * https://github.com/zhizuqiu/danmu-comment
 */

/////////////////////////////
var server_port = 8003;
/////////////////////////////

var WebSocket = require('ws');
var uuid = require('node-uuid');
var WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({ port: server_port });
var clients = [];
function wsSend(type, data) {
    for (var i = 0; i < clients.length; i++) {
        var clientSocket = clients[i].ws;
        if (clientSocket.readyState === WebSocket.OPEN&&data['title']==clients[i].page) {
            var time = Date.parse(new Date())/1000;
            if(data['danmu']){
                clientSocket.send(JSON.stringify({
                    "type": type,
                    "message": data['danmu'],
                    "time": time
                }));
                console.log(data);
            }
        }
    }
}
wss.on('connection', function(ws) {
    var client_uuid = uuid.v4();//use for closeSocket()
    ws.on('message', function(message) {
        var data = JSON.parse(message);
        if(data['type']=='login'){
            clients.push({ "id": client_uuid , "ws": ws , "page":data['title']});
        }
        wsSend("message", data);
    });
    var closeSocket = function(customMessage) {
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].id == client_uuid) {
                var disconnect_message;
                if (customMessage) {
                    disconnect_message = customMessage;
                } else {
                    disconnect_message = "disconnected";
                }
                clients.splice(i, 1);
            }
        }
    };
    ws.on('close', function () {
        closeSocket();
    });
});