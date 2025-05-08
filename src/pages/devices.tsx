'use client'
import React, { ReactElement } from "react";

import { PageMetadata } from "@/context/page-metadata";
import Device, { DeviceType } from "@/types/device";
import { DeviceEditor } from "@/components/editors/device-editor";
import Icons from "@/components/icons";
import { Button } from "@heroui/react";
import { DeviceAdd } from "@/components/editors/device-add";
import { useDevices } from "@/context/device";
import DeviceRow from "@/components/device/device-row";

const Page = () => {
  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(null);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = React.useState(false);

  const { devices, reloadDevicesData } = useDevices();

  return (<>
    <div className="flex gap-8 flex-col min-h-svh pt-10">
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="text-3xl font-normal tracking-wide">All Devices</div>
        <Button
          isIconOnly
          variant="flat"
          className="flex items-center justify-center rounded-full"
          onPress={() => setIsAddDeviceOpen(true)}
        >
          <Icons.PlusIcon color="black" strokeWidth={2.5} size={24} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {devices.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-0 p-4 py-10 rounded-xl bg-white">
            <Icons.EmptyBoxIcon size={64} />
            <div className="text-lg font-normal tracking-wide mt-3">No devices found</div>
            <div className="text-sm text-default-400">Add a new device to get started</div>
          </div>
        )}
        {devices.map((device) => (
          <DeviceRow
            key={device.id}
            device={device}
            onClick={() => setSelectedDevice(device)}
          />
        ))}
      </div>
    </div>

    <DeviceAdd
      isOpen={isAddDeviceOpen}
      onClose={() => {
        setIsAddDeviceOpen(false);
        reloadDevicesData();
      }}
      onDeviceAdded={() => {
        setIsAddDeviceOpen(false);
      }}
    />

    <DeviceEditor
      isOpen={!!selectedDevice}
      device={selectedDevice || {id: '', name: '', ownerId: '', deviceType: DeviceType.SWITCH}}
      onClose={() => {
        setSelectedDevice(null);
        reloadDevicesData();
      }}
    />


  </>);
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (<PageMetadata.Provider><PageMetadata.AppMainLayout>{page}</PageMetadata.AppMainLayout></PageMetadata.Provider>);
};

export default Page;