/**
 * Created by zhizuqiu on 2016/11/6.
 */

var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({ port: 8002 });
var uuid = require('node-uuid');
var clients = [];
function wsSend(type, client_uuid, nickname, data) {
    for (var i = 0; i < clients.length; i++) {
        var clientSocket = clients[i].ws;
        if (clientSocket.readyState === WebSocket.OPEN&&data['title']==clients[i].page) {
            var time = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
            if(data['danmu']){
                clientSocket.send(JSON.stringify({
                    "type": type,
                    "nickname": nickname,
                    "message": data['danmu'],
                    "time": time,
                }));
            }
        }
    }
}
var clientIndex = 1;
wss.on('connection', function(ws) {
    var client_uuid = uuid.v4();
    var nickname = "匿名用户_" + clientIndex;
    ws.on('message', function(message) {
        var data = JSON.parse(message);
        if(data['type']=='login'){
            clientIndex += 1;
            clients.push({ "id": client_uuid, "ws": ws, "nickname": nickname ,"page":data['title']});
        }
        wsSend("message", client_uuid, nickname, data);
    });
    var closeSocket = function(customMessage) {
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].id == client_uuid) {
                var disconnect_message;
                if (customMessage) {
                    disconnect_message = customMessage;
                } else {
                    disconnect_message = nickname + " has disconnected";
                }
                clients.splice(i, 1);
                wsSend("logout", client_uuid, nickname, disconnect_message);
            }
        }
    };
    ws.on('close', function () {
        closeSocket();
    });
    process.on('SIGINT', function () {
        console.log("Closing things");
        closeSocket('Server has disconnected');
        process.exit();
    });
});