import Icons from "../icons";
import { Automation, AutomationType } from "@/types/automation";
import DeviceIcons from "../device/device-icons";

const AutomationControlIcon = ({
	automation,
	isControllable = false,
}: {
	automation: Automation;
	isControllable?: boolean;
}) => {
	const isActive = automation.enable;

	return (
		<div
			className={`
				flex items-center justify-center
				w-12 h-12 min-w-12 rounded-full
				${isActive ? "bg-black" : "bg-default-100/50"}
				${isControllable ? "cursor-pointer hover:opacity-80" : ""}
				transition-colors duration-200
			`}
			onClick={() => {
			}}
		>
			{ automation.type === AutomationType.TIMER_TRIGGER ? (
				<Icons.ClockIcon color={isActive ? "white" : "black"} size={24} strokeWidth={1.2} />
			) : automation.type === AutomationType.DEVICE_TRIGGER ? (
				<DeviceIcons.SensorIcon color={isActive ? "white" : "black"} size={24} strokeWidth={1.2} />
			) : (
				<Icons.BoltIcon />
			)}
			
		</div>
	)
}

export default AutomationControlIcon;