import { Kafka }  from 'kafkajs';

const topic = process.argv[2] || 'Users';

async function run() {
	try {
		const kafka = new Kafka({
			clientId: 'kafka-node',
			brokers: ['localhost:9091'],
		});

		const admin = kafka.admin();

		await admin.connect();

		await admin.createTopics({
			topics: [
				{
					topic,
				},
			],
		});

	  console.log(`'${topic}' topic created successfully!`);

	  await admin.disconnect();
	} catch (error) {
		console.error(`Error occurred: ${error}`);
	}
}

run();
