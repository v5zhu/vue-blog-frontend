import Stomp from 'stompjs';

var stompClient = null;

const websocket = {
    openConnection() {
        var socket = new SockJS("http://localhost:8800/thirdapi/webSocketServer");

        // 获取 STOMP 子协议的客户端对象
        stompClient = Stomp.over(socket);
        // 向服务器发起websocket连接并发送CONNECT帧
        var that = this;
        stompClient.connect({},
            function connectCallback(frame) {
                // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
                stompClient.subscribe('/app/subscribeTest', function (response) {
                    that.subscribe();
                });
            },
            function errorCallBack(error) {
                // 连接失败时（服务器响应 ERROR 帧）的回调方法
                console.error("连接失败");
            }
        );
    },
    subscribe() {
        stompClient.subscribe('/topic/subscribeTest', function (response) {
            var returnData = JSON.parse(response.body);
            console.log("/topic/subscribeTest 你接收到的消息为:" + returnData.responseText);
        });
    },
    closeConnection() {
        stompClient.disconnect(function () {
            alert("See you next time!");
        })
    }
}

export default websocket;