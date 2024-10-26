import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MqttWebSocketComponent = () => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const host = 'iotmnt.com';  // Your MQTT WebSocket host
    const port = '1700';  // Make sure this is the correct WebSocket port for wss://
    const topicToReceive = 'usuarios_novofit_gym_env'; // The topic to subscribe to

    // Set up WebSocket connection
    const client = mqtt.connect(`wss://${host}:${port}`, {
      clientId: 'your-client-id', // Make sure this ID is unique
      username: process.env.NEXT_PUBLIC_CLIENT_USERNAME,
      password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
    });

    client.on('connect', () => {
      console.log('Connected to MQTT WebSocket broker');
      setConnected(true);
      client.subscribe(topicToReceive, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topicToReceive}`);
        } else {
          console.error('Subscription error:', err);
        }
      });
    });

    client.on('message', (topic, payload) => {
      console.log(`Received message on topic ${topic}:`, payload.toString());
      setMessage(payload.toString());
    });

    client.on('error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>MQTT WebSocket Test</h1>
      <p>Connected: {connected ? 'Yes' : 'No'}</p>
      <p>Received Message: {message || 'No messages yet'}</p>
    </div>
  );
};

export default MqttWebSocketComponent;
