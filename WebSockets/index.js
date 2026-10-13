import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        
        // broadcast the message to all clients except the sender
        wss.clients.forEach(function each(client) {

          if (client !== ws && client.readyState === ws.OPEN) {
              client.send('New data!');
          }
            
        });
    });
});
