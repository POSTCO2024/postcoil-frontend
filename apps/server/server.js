import fs from 'fs';
import { WebSocketServer } from 'ws'; // WebSocketServer로 가져오기

const wss = new WebSocketServer({ port: 8088 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const intervalId = setInterval(async () => {
    try {
      const data = await fs.promises.readFile(
        './response_1726719100357.json',
        'utf8',
      );
      ws.send(data, (err) => {
        if (err) {
          console.error('Error sending data', err);
        }
      });
    } catch (err) {
      console.error('Error reading the file', err);
    }
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

// const WebSocket = require('ws');
// const kafka = require('kafka-node'); // Kafka 모듈 불러오기

// const wss = new WebSocket.Server({ port: 8088 });

// // Kafka 컨슈머 설정
// const Consumer = kafka.Consumer;
// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const consumer = new Consumer(client, [{ topic: 'myTopic', partition: 0 }], { autoCommit: true });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // Kafka에서 메시지 수신 시 WebSocket으로 전달
//   consumer.on('message', function (message) {
//     console.log('Received message from Kafka:', message);
//     ws.send(message.value, (err) => {
//       if (err) {
//         console.error('Error sending data', err);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });
