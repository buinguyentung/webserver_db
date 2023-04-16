const { Kafka } = require('kafkajs');
const { Chance } = require('chance');

const kafka = new Kafka({
  clientId: 'tung-producer',
  brokers: ['localhost:9092', 'localhost:9093'],
});

const producer = kafka.producer();

const chance = new Chance();
const topic = 'animals';

const produceMessage = async () => {
  try {
    const value = chance.animal();
    console.log(value);

    await producer.send({
      topic,
      messages: [
        { value: value },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

const run = async () => {
  await producer.connect();
  // await producer.send({
  //   topic: 'tung-topic',
  //   messages: [
  //     { value: 'Hi Kafka!' },
  //     { value: 'My name is Tung.' },
  //     { value: 'Nice to meet you.' },
  //   ],
  // });

  setInterval(produceMessage, 1000);
};

run().catch(console.error);
