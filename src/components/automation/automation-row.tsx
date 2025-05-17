import Icons from "../icons";
import { useState } from "react";
import { Automation, AutomationType } from "@/types/automation";
import AutomationControlIcon from "./automation-control-icon";
import { useDevices } from "@/context/device";
import { formatDeviceStatusKey, formatDeviceStatusValue } from "@/types/device";

const AutomationRow = ({
  automation,
  onClick,
}: {
  automation: Automation;
  onClick: () => void;
}) => {

  const [isHovered, setIsHovered] = useState(false);

  const { getDeviceById } = useDevices();

  return (
    <div
      key={automation.id}
      className={`
        flex flex-row justify-between items-center gap-4 p-2 px-3 
        rounded-xl shadow-lg shadow-default-200 
        ${isHovered ? "bg-default-100 cursor-pointer" : "bg-white"}
        transition-colors duration-100 overflow-hidden`}
    >
      <AutomationControlIcon automation={automation} />
      <div
        className="w-full flex-1 flex flex-col justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="text-nowrap text-md font-normal text-ellipsis overflow-hidden max-w-36">{automation.name}</div>
        <div className="text-nowrap text-xs/4 text-default-400 text-ellipsis overflow-hidden">
          {automation.type === AutomationType.TIMER_TRIGGER ? (
            <div>{`At ${automation.trigger.time}`}</div>
          ) : automation.type === AutomationType.DEVICE_TRIGGER ? (
            <div className="flex flex-row gap-1">
              {`${getDeviceById(automation.trigger.deviceId)?.name}`}
              {`  ${formatDeviceStatusKey(automation.trigger.attribute ?? '')} ${automation.trigger.operator} ${formatDeviceStatusValue(automation.trigger.attribute ?? '', automation.trigger.value ?? '')}`}
            </div>
          ) : (
            <div>{`${automation.trigger}`}</div>
          )}
        </div>
        <div className="text-nowrap text-xs/4 text-default-400 text-ellipsis overflow-hidden">
          {`Set ${getDeviceById(automation.action.deviceId)?.name}`}
          {` — ${formatDeviceStatusKey(automation.action.attribute ?? '')} ${formatDeviceStatusValue(automation.action.attribute ?? '', automation.action.value ?? '')}`}
        </div>
      </div>
      <Icons.ChevronRight strokeWidth={1.5} size={16} color='hsl(var(--heroui-default-400))' />
    </div>
  );
}

export default AutomationRow;