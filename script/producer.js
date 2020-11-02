/**
 * kafka-node 的 API 实践
 */

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({
        kafkaHost: 'localhost:9092',
    }),
    producer = new Producer(client);

var topic = 'node-topic-1';

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