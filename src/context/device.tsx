"use client"

import DeviceAPI from '@/api/device';
import Device from '@/types/device';
import { useRouter } from 'next/navigation'

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useMqtt } from './mqtt';

export const DevicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const [devices, setDevices] = useState<Device[]>([]);
  const [devicesLoading, setDevicesLoading] = useState<boolean>(true);

  const { mqttMessage } = useMqtt();

  const reloadDevicesData = useCallback(async () => {
    setDevicesLoading(true);
    const fetchedDevices = (await DeviceAPI.fetchDevices()).sort((a: Device, b: Device) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setDevices(fetchedDevices);
    setDevicesLoading(false);
    // eslint-disable-next-line
  }, [router]);

  useEffect(() => {
    reloadDevicesData();
  }, [router, reloadDevicesData]);

  useEffect(() => {
    if (mqttMessage) {
      const parsedMessage = JSON.parse(mqttMessage);
      const newDevice = JSON.parse(parsedMessage.message);
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === newDevice.id ? {
            ...device,
            currentStatus: JSON.parse(newDevice.currentStatus)
          } : device
        )
      );
    }
  }, [mqttMessage]);

  const getDeviceById = (id: string | null | undefined) => {
    if (!id) return null;
    if (!devices) return null;
    const device = devices.find((device) => device.id === id);
    if (!device) {
      return null;
    }
    return device;
  };

  return (
    <DevicesContext.Provider value={{
      devices,
      setDevices,
      devicesLoading,
      reloadDevicesData,
      getDeviceById,
    }}>
      {children}
    </DevicesContext.Provider>
  );
};

const DevicesContext = createContext<{
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  devicesLoading: boolean;
  reloadDevicesData: () => Promise<void>;
  getDeviceById: (id: string | null | undefined) => Device | null;
} | undefined>(undefined);

export const useDevices = () => {
  const context = useContext(DevicesContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DevicesProvider');
  }
  return context;
};
