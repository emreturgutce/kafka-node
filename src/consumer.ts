import { Kafka } from 'kafkajs';

const topic = process.argv[2] || 'Users';

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'kafka-node',
      brokers: ['localhost:9091'],
    });

    const consumer = kafka.consumer({
      groupId: 'users-consumer-group',
    });

    await consumer.connect();

    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(`Message Received: ${result.message.value}`);
      },
    });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

run();
