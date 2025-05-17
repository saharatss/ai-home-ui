// src/context/MqttContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';

interface MqttContextType {
  mqttClient: mqtt.MqttClient | null;
  mqttConnected: boolean;
  mqttMessage: string | null;
  mqttPublish: (topic: string, message: string) => void;
}

const MqttContext = createContext<MqttContextType | undefined>(undefined);

interface MqttProviderProps {
  options?: mqtt.IClientOptions;
  children: React.ReactNode;
}

export const MqttProvider: React.FC<MqttProviderProps> = ({
  options,
  children,
}) => {
  const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER;
  const clientRef = useRef<mqtt.MqttClient | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!brokerUrl) {
      console.error('NEXT_PUBLIC_MQTT_BROKER is not set in the environment variables.');
      return;
    }

    const client = mqtt.connect(brokerUrl, options);
    clientRef.current = client;

    client.on('connect', () => {
      console.log('MQTT connected');
      setConnected(true);
      console.log('MQTT Client ID:', client.options.clientId);
      client.subscribe(`user/${localStorage.getItem('userId')}/#`, (err) => {
        if (err) {
          console.error('MQTT Subscribe Error:', err);
        }else{
          console.log('MQTT Subscribed to user topic');
        }
      });
    });

    client.on('close', () => {
      console.log('MQTT disconnected');
      setConnected(false);
    });

    client.on('message', (_, payload) => {
      console.log('MQTT Message:', payload.toString());
      setMessage(payload.toString());
    });

    client.on('error', (err) => {
      console.error('MQTT Error:', err);
    });

    return () => {
      client.end();
    };
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brokerUrl, JSON.stringify(options)]);

  const publish = (topic: string, msg: string) => {
    if (clientRef.current && connected) {
      clientRef.current.publish(topic, msg);
    }
  };

  return (
    <MqttContext.Provider value={{
      mqttClient: clientRef.current,
      mqttConnected: connected,
      mqttMessage: message,
      mqttPublish: publish
    }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = (): MqttContextType => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error('useMqtt must be used within a MqttProvider');
  }
  return context;
};
