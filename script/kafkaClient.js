/**
 * API 实践
 */

//#region ： 创建 topic
/*
var kafka = require('kafka-node');
var client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092',
});

let payloads = [{
    topic: 'node-topic-1',
    partitions: 1,
    replicationFactor: 1,
}];

client.createTopics(payloads, (error, result) => {
    console.log(result);
});
*/
//#endregion


//#region ：producer
/*
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({
        kafkaHost: 'localhost:9092',
    }),
    producer = new Producer(client);

var topic = 'node-topic-2';

let payloads = [{
    topic: topic,  // 如果没有这个topic，也会开始创建
    messages: 'hi_from_node' + new Date(),
    partitions: 1,
    replicationFactor: 1,
}];

producer.on('ready', function () {
    console.log('ready');
    producer.createTopics([topic], function (err, data) {
        producer.send(payloads, function (err, data) {
            console.log(err || data);
            process.exit();
        })
    })
});
producer.on('error', function (err) {
    console.log('error', err);
});
*/
//#endregion

//#region :consumer
var kafka = require('kafka-node'),
    ConsumerGroup = kafka.ConsumerGroup;

// var topic = 'node-topic-2';
var topic = 'getRides';

var options = {
    host: 'localhost:9092',
    groupId: 'group-test',
    sessionTimeout: 15000,
    autoCommit: true,
    fromOffset: 'earliest'// 'latest' ，相当于java版本中的 auto.offset.reset
    //     消费者要从头开始消费某个topic的全量数据，需要满足2个条件（spring-kafka）：
    // （1）使用一个全新的"group.id"（就是之前没有被任何消费者使用过）;
    // （2）指定"auto.offset.reset"参数的值为earliest；
};

var c1 = new ConsumerGroup(Object.assign({ id: 'c1' }, options), topic);
c1.on('message', onMessage);
c1.on('error', onError);

function onMessage(message) {
    console.log(this.client.clientId);
    console.log(message);
    //#region : 打印出来的message
    //  {
    //     topic: 'getRides',
    //     value:
    //         '2247,START,2013-01-01 00:09:00,1970-01-01 00:00:00,-73.98483,40.728947,-73.99206,40.749104,2,2013002199,2013002196',
    //     offset: 2610,
    //     partition: 0,
    //     highWaterOffset: 2633,
    //     key: null,
    //     timestamp: 2019 - 10 - 07T03: 47: 13.058Z
    // }
    //#endregion
}

function onError(err) {
    console.log(err);
}
//#endregion