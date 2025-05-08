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
      timeout: 3000,
    });
    return null;
  };
}

export const createDevice = async (device: Device) => {
  try {
    device.ownerId = localStorage.getItem('userId') || '';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/device/`, {
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
    return await response.json();
  } catch (error) {
    console.warn('Error creating device', error);
    addToast({
      title: "Error",
      description: "Error creating device",
      color: "danger",
      timeout: 3000,
    });
    return null;
  };
}

export const deleteDevice = async (deviceId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/device/${deviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      console.warn('Error deleteDevice', response.statusText);
      addToast({
        title: "Error",
        description: "Error deleting device",
        color: "danger",
      });
      return null;
    }
    return true;
  } catch (error) {
    console.warn('Error deleting device', error);
    addToast({
      title: "Error",
      description: "Error deleting device",
      color: "danger",
      timeout: 3000,
    });
    return null;
  }
};

export const updateDeviceStatus = async (deviceId: string, status: object) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/device/${deviceId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(status),
    });
    if (!response.ok) {
      console.warn('Error updateDeviceStatus', response.statusText);
      addToast({
        title: "Error",
        description: "Error updating device status",
        color: "danger",
      });
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn('Error updating device status', error);
    addToast({
      title: "Error",
      description: "Error updating device status",
      color: "danger",
      timeout: 3000,
    });
    return null;
  }
};

const DeviceAPI = {
  fetchDevices,
  createDevice,
  deleteDevice,
  updateDeviceStatus,
};

export default DeviceAPI;