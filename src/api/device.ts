import Device from "@/types/device";
import { addToast } from "@heroui/react";

export const fetchDevices = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/device/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      console.warn('Error fetchDevices', response.statusText);
      addToast({
        title: "Error",
        description: "Error fetching devices",
        color: "danger",
      });
      return [];
    }
    const json = await response.json();
    json.forEach((device: {
      currentStatus: string,
      config: string
    }) => {
      device.currentStatus = JSON.parse(device.currentStatus);
      device.config = JSON.parse(device.config);
    });
    return json;
  } catch (error) {
    console.warn('Error fetching devices', error);
    addToast({
      title: "Error",
      description: "Error fetching devices",
      color: "danger",
    });
    return null;
  };
}

export const createDevice = async (device: Device) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/orders/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device),
      credentials: 'include',
    });
    if (!response.ok) {
      console.warn('Error createDevice', response.statusText);
      addToast({
        title: "Error",
        description: "Error creating device",
        color: "danger",
      });
      return null;
    }
    const json = await response.json();
    return json.order;
  } catch (error) {
    console.warn('Error creating device', error);
    addToast({
      title: "Error",
      description: "Error creating device",
      color: "danger",
    });
    return null;
  };
}

const DeviceAPI = {
  fetchDevices,
  createDevice,
};

export default DeviceAPI;