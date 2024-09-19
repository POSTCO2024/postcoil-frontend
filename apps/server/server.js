import fs from 'fs';
import WebSocket from 'ws'; // WebSocket 모듈도 import로 불러옴

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const intervalId = setInterval(async () => {
    try {
      // 파일을 비동기적으로 읽음
      const data = await fs.promises.readFile('./meshData.json', 'utf8');
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
    clearInterval(intervalId); // 인터벌 제거
  });
});
