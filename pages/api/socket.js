import WebSocket from 'ws';
import { mongooseConnect } from '../../../lib/mongoose';
import Ticket from '../../../models/Ticket';

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message);
    const { ticketId, user, text } = parsedMessage;

    // Save message to database
    await mongooseConnect();
    await Ticket.findByIdAndUpdate(ticketId, {
      $push: { chat: { user, message: text } },
    });

    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.socket.server.wss = wss;
    res.end();
  } else {
    res.status(405).end();
  }
}
