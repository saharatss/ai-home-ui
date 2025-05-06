'use client'
import React, { ReactElement } from "react";

import { PageMetadata } from "@/context/page-metadata";
import Device from "@/types/device";
import { DeviceEditor } from "@/components/editors/device-editor";
import { Button } from "@heroui/react";
import { Icons } from "@/components/icons";

const Page = () => {

  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(null);

  return (<>
    <div className="flex gap-8 flex-col min-h-svh pt-10 px-4">

      <div className="flex flex-row justify-between items-center gap-3">
        <div className="text-3xl font-normal tracking-wide">Energy Usage</div>
        <Button
          isIconOnly
          variant="flat"
          className="flex items-center justify-center rounded-full"
          onPress={()=>{  }}
        >
          <Icons.PlugIcon2 color="black" strokeWidth={2.5} size={20} />
        </Button>
      </div>

      <DeviceEditor
        isOpen={!!selectedDevice}
        device={selectedDevice ?? undefined}
        onClose={() => setSelectedDevice(null)}
      />
    </div>


  </>);
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (<PageMetadata.Provider><PageMetadata.AppMainLayout>{page}</PageMetadata.AppMainLayout></PageMetadata.Provider>);
};

export default Page;