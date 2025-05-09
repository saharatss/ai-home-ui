import Device, { formatDeviceStatusKey, formatDeviceStatusValue } from "@/types/device";
import Icons from "../icons";
import DeviceControlIcon from "./device-control-icon";
import { useState } from "react";

const DeviceRow = ({
  device,
  onClick,
}: {
  device: Device;
  onClick: () => void;
}) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={device.id}
      className={`
        flex flex-row justify-between items-center gap-4 p-2 px-3 
        rounded-xl shadow-lg shadow-default-200 
        ${isHovered ? "bg-default-100 cursor-pointer" : "bg-white"}
        transition-colors duration-100 overflow-hidden`}
    >
      <DeviceControlIcon device={device} />
      <div
        className="flex-1 flex flex-col justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="text-nowrap text-md font-normal">{device.name}</div>
        <div className="text-nowrap text-xs/4 text-default-400 text-ellipsis overflow-hidden">{device.currentStatus ? Object.entries(device.currentStatus).map(([key, value]) => (
          <div key={key}>{`
            ${formatDeviceStatusKey(key)}
            ${formatDeviceStatusValue(key, value)}
          `}</div>
        )) : <div>No status available</div>}
        </div>
      </div>
      <Icons.ChevronRight strokeWidth={1.5} size={16} color='hsl(var(--heroui-default-400))' />
    </div>
  );
}

export default DeviceRow;