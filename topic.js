const { Kafka } = require('kafkajs');

async function run() {
	try {
		const kafka = new Kafka({
			clientId: 'kafka-node',
			brokers: ['localhost:9092'],
		});

		const admin = kafka.admin();

		await admin.connect();

		await admin.createTopics({
			topics: [
				{
					topic: 'Users',
					numPartitions: 2,
				},
			],
		});

	  console.log('TOPIC Created successfully !');

	  await admin.disconnect();
	} catch (error) {
		console.error(`Error occurred: ${error}`);
	}
}

run();
