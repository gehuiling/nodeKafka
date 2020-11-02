/**
 * kafka-node 实践，接受 topic 中的数据
 */

const kafka = require('kafka-node');
const express = require('express');
const ConsumerGroup = kafka.ConsumerGroup;

var topic = 'node-topic-1';

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
    // console.log(this.client.clientId);
    // console.log(message);

    var app = express();

    app.all('*', function (req, res, next) {             //设置跨域访问
        res.header("Access-Control-Allow-Origin", "*");  // 指定允许其他域名访问，设置*是最简单粗暴的，但是服务器出于安全考虑，一般不会这么干....，而且，如果是*的话，游览器将不会发送cookies，即使你的XHR设置了withCredentials
        res.header("Access-Control-Allow-Headers", "X-Requested-With");//允许的请求头字段
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");//允许的请求类型
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    //传到页面的数据
    app.get('/', function (req, res) {           //配置接口api
        res.status(200),
            res.json(message.value)
    })

    //配置服务端口
    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('listen at http://%s:%s', host, port)
    })
}

function onError(err) {
    console.log(err);
}

