import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { workflowRouter } from './routes/workflow.js';
import { setupWebSocketHandlers } from './websocket/handler.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workflows', workflowRouter);

// WebSocket connection handler
setupWebSocketHandlers(wss);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});