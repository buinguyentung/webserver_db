const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'tung-consumer',
  brokers: ['localhost:9092', 'localhost:9093'],
});

const consumer = kafka.consumer({ groupId: 'consumer-group' });
const topic = 'animals';

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
