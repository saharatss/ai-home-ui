import Device, { DeviceType } from "@/types/device";
import Icons from "../icons";
import DeviceIcons from "./device-icons";

const DeviceRow = ({
  device,
  onClick,
}: {
  device: Device;
  onClick: () => void;
}) => {

  const formatValueToString = (key: string, value: boolean | number | null) => {
    if (key === "power") {
      return value ? "On" : "Off";
    } else if (key === "motion") {
      return value ? "Detected" : "Not Detected";
    } else if (key === "brightness") {
      return typeof value === "number" ? `${value * 100}%` : "N/A";
    } else if (key === "temperature") {
      return `${value}°C`;
    } else if (key === "humidity") {
      return `${value}%`;
    }
    return value;
  };

  return (
    <div
      key={device.id}
      className="flex flex-row justify-between items-center gap-4 p-2 px-3 rounded-xl shadow-lg shadow-default-200 bg-white hover:bg-gray-100 cursor-pointer transition-colors duration-100 overflow-hidden"
      onClick={onClick}
    >
      <div className={`
        flex items-center justify-center
        w-12 h-12 rounded-full
        ${device.currentStatus?.power ? "bg-black" : "bg-default-100/50"}
      `}>
        {device.deviceType === DeviceType.SWITCH ? (
          device.currentStatus?.power === true ? (
            <DeviceIcons.SwitchOnIcon size={24} color={device.currentStatus?.power ? "white" : "black"} />
          ) : (
            <DeviceIcons.SwitchOffIcon size={24} color={device.currentStatus?.power ? "white" : "black"} />
          )
        ) : device.deviceType === DeviceType.OUTLET ? (
          <DeviceIcons.OutletIcon size={24} color={device.currentStatus?.power ? "white" : "black"} />
        ) : device.deviceType === DeviceType.LIGHT ? (
          <DeviceIcons.LightIcon size={24} color={device.currentStatus?.power ? "white" : "black"} />
        ) : device.deviceType === DeviceType.THERMOSTAT ? (
          <DeviceIcons.ThermostatIcon size={24} color={device.currentStatus?.power ? "white" : "black"} />
        ) : (
          <Icons.BoltIcon size={24} />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-nowrap text-md font-normal">{device.name}</div>
        <div className="text-nowrap text-xs/4 text-default-400 text-ellipsis overflow-hidden">{device.currentStatus ? Object.entries(device.currentStatus).map(([key, value]) => (
          <div key={key}>{`${key} ${formatValueToString(key, value)}`}</div>
        )) : <div>No status available</div>}
        </div>
      </div>
      <Icons.ChevronRight strokeWidth={1.5} size={16} color='hsl(var(--heroui-default-400))' />
    </div>
  );
}

export default DeviceRow;