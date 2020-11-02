/**
 * API 实践
 */

//#region 
// var kafka = require('kafka-node');
// var client = new kafka.KafkaClient({
//     kafkaHost: 'localhost:9092',
// });

// let payloads = [{
//     topic: 'node-topic-1',
//     partitions: 1,
//     replicationFactor: 1,
// }];

// client.createTopics(payloads, (error, result) => {
//     console.log(result);
// });
//#endregion
//////////////

//#region 
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({
        kafkaHost: 'localhost:9092',
    }),
    producer = new Producer(client);

var topic = 'node-topic-1';

let payloads = [{
    topic: topic,
    messages: 'Message from node-topic-1:' + new Date(),
    partitions: 1,
    replicationFactor: 1,
}];

producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(err || data);
            process.exit();
        })
});

//#endregion

//#region :consumer
// var kafka = require('kafka-node'),
//     ConsumerGroup = kafka.ConsumerGroup;

// var topic = 'node-topic-1';

// var options = {
//     host: 'localhost:9092',
//     groupId: 'group-test',
//     sessionTimeout: 15000,
//     autoCommit: true,
//     fromOffset: 'earliest'
// };

// var c1 = new ConsumerGroup(Object.assign({ id: 'c1' }, options), topic);
// c1.on('message', onMessage);
// c1.on('error', onError);

// function onMessage(message) {
//     console.log(this.client.clientId);
//     console.log(message);
// }

// function onError(err) {
//     console.log(err);
// }
//#endregion