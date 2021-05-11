import { Kafka } from 'kafkajs';

const topic = process.argv[2] || 'Users';
const value = process.argv[3] || 'This is a test message !';

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'kafka-node',
      brokers: ['localhost:9091'],
    });

    const producer = kafka.producer();

    await producer.connect();

    let i = 0;

    setInterval(async () => {
      const result = await producer.send({
        topic,
        messages: [
          {
            value: `${value}: ${i++}`,
          },
        ],
      });

      console.log(`Message sent: ${JSON.stringify(result)}`);
    }, 500);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

run();
