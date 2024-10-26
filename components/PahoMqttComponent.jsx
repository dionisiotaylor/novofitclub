import { useEffect, useState } from 'react';
import { Client } from 'paho-mqtt';

const PahoMqttComponent = () => {
  const [message, setMessage] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Broker settings
    const brokerHost = 'iotmnt.com';
    const brokerPort = 1700; // Adjust this to the WebSocket port on your broker
    const clientId = 'NovoFit_ClientID_Variable';
    const topic = 'usuarios_novofit_gym_recep'; // The topic to subscribe to

    // Initialize the Paho Client
    const client = new Client(`wss://${brokerHost}:${brokerPort}/mqtt`, clientId);
    
    // Define event handlers
    client.onConnectionLost = (responseObject) => {
      console.error('Connection lost:', responseObject.errorMessage);
      setConnected(false);
    };

    client.onMessageArrived = (message) => {
      console.log(`Received message: ${message.payloadString}`);
      setMessage(message.payloadString);
    };

    // Connect to the broker
    client.connect({
      onSuccess: () => {
        console.log('Connected to Paho MQTT broker');
        setConnected(true);
        client.subscribe(topic, {
          onSuccess: () => {
            console.log(`Subscribed to topic: ${topic}`);
          },
          onFailure: (error) => {
            console.error('Subscription error:', error);
          },
        });
      },
      userName: "NovoFit",
      password: "wd45_qEki_aEki1_i28d_whoh_qkIdh",
      useSSL: true,  // Enables SSL for WebSocket connections
      onFailure: (error) => {
        console.error('Connection error:', error);
      },
    });
    console.log(client.isConnected());
    // Cleanup on unmount
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>Paho MQTT WebSocket Test</h1>
      <p>Connected: {connected ? 'Yes' : 'No'}</p>
      <p>Received Message: {message || 'No messages yet'}</p>
    </div>
  );
};

export default PahoMqttComponent;
