const express = require('express');
const expressWs = require('express-ws');
const kafka = require('kafka-node');
const ConsumerGroup = kafka.ConsumerGroup;
const router = express.Router();

var SOURCE_DATA = "source-data";  // 原始数据
const TEN_SEC_PASSENGER = 'ten-sec-passenger'; // 10s 乘客统计的topic

expressWs(router);

router.ws('/taxiStream', (ws, req) => {
    ws.send('连接成功');

    //#region 给客户端发送 "getRides" topic中的消息
    if (ws.readyState === ws.OPEN) {

        var topic = SOURCE_DATA;

        var options = {
            host: 'localhost:9092',
            groupId: 'group-test1',
            sessionTimeout: 15000,
            autoCommit: true,
            fromOffset: 'earliest'
        };

        var c1 = new ConsumerGroup(Object.assign({ id: 'c1' }, options), topic);
        c1.on('message', onMessage);
        c1.on('error', onError);

        function onMessage(message) {
            ws.send(message.value);
            // console.log(this.client.clientId);
            // console.log(message);
        }

        function onError(err) {
            console.log(err);
        }

    }
    //#endregion

    //#region  监听客户端发来的数据，直接将信息原封不动返回回去
    ws.on('message', msg => {
        ws.send(msg) // 服务端也可以发消息给客户端
    })
    //#endregion
})

module.exports = router