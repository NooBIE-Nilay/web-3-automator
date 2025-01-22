export function setupWebSocketHandlers(wss) {
  const clients = new Set();

  wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
      clients.delete(ws);
    });

    // Handle workflow execution status updates
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        // Handle different message types if needed
      } catch (error) {
        console.error('Invalid WebSocket message:', error);
      }
    });
  });

  // Broadcast updates to all connected clients
  return {
    broadcast: (data) => {
      const message = JSON.stringify(data);
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      }
    }
  };
}