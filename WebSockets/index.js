import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

    console.log('Oracle Apex connected.');

    ws.on('message', function incoming(message) {

        console.log('Message from Oracle Apex --> ' + message);
        
        // broadcast
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === ws.OPEN) {

            client.send('New data!');

          }
        });

    });
    
});