const WebSocket = require('ws');
const http = require('http');
//updatetest
// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running\n');
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });

// 处理 WebSocket 连接
wss.on('connection', (ws) => {
  console.log('Client connected');

  // 处理消息事件
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);

    // 将接收到的消息广播给所有连接的客户端，排除当前客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // 处理关闭事件
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// 启动 HTTP 服务器
const port = 8080;
server.listen(port, () => {
  console.log(`Server is listening on ws://localhost:${port}`);
});
