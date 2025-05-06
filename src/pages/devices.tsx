'use client'
import React, { ReactElement } from "react";

import { PageMetadata } from "@/context/page-metadata";
import Device from "@/types/device";
import { DeviceEditor } from "@/components/editors/device-editor";
import { Icons } from "@/components/icons";
import { Button } from "@heroui/react";
import DeviceAPI from "@/api/device";

const DeviceItem = ({
  device,
  onClick,
}: {
  device: Device;
  onClick: () => void;
}) => {
  return (
    <div
      key={device.id}
      className="flex flex-row justify-between items-center gap-0 p-2 px-3 rounded-xl shadow-lg shadow-default-200 bg-white hover:bg-gray-100 cursor-pointer transition-colors duration-100 overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full flex flex-col justify-center">
        <div className="text-nowrap text-md font-normal">{device.name}</div>
        <div className="text-nowrap text-xs">{device.deviceType}</div>
        <div className="text-nowrap text-xs text-default-400 text-ellipsis overflow-hidden">{JSON.stringify(device.currentStatus)}</div>
      </div>
      <Icons.ChevronRight strokeWidth={1.5} size={16} color='hsl(var(--heroui-default-400))' />
    </div>
  );
}

const Page = () => {
  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(null);

  const [devices, setDevices] = React.useState<Device[]>([]);

  React.useEffect(() => {
    const fetchDevices = async () => {
      const devices = await DeviceAPI.fetchDevices();
      console.log('devices', devices);
      if (devices) {
        setDevices(devices);
      }
    }
    fetchDevices();
    // eslint-disable-next-line
  }, []);

  const handleAddDevice = () => {
    // Logic to add a new device
  }

  return (<>
    <div className="flex gap-8 flex-col min-h-svh pt-10 px-4">
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="text-3xl font-normal tracking-wide">All Devices</div>
        <Button
          isIconOnly
          variant="flat"
          className="flex items-center justify-center rounded-full"
          onPress={handleAddDevice}
        >
          <Icons.PlusIcon color="black" strokeWidth={2.5} size={24} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {devices.map((device) => (
          <DeviceItem
            key={device.id}
            device={device}
            onClick={() => setSelectedDevice(device)}
          />
        ))}
      </div>
    </div>

    <DeviceEditor
      isOpen={!!selectedDevice}
      device={selectedDevice ?? undefined}
      onClose={() => setSelectedDevice(null)}
    />


  </>);
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (<PageMetadata.Provider><PageMetadata.AppMainLayout>{page}</PageMetadata.AppMainLayout></PageMetadata.Provider>);
};

export default Page;