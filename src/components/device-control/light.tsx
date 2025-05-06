import Device from "@/types/device";
// import { Switch } from "@heroui/react";

export const DeviceControlLight = ({
	device,
}:{
	device: Device;
}) => {
	console.log("DeviceControlLight", device);
  return (<>
		<div className="flex flex-col gap-4">
			{/* <Switch
				checked={device.currentStatus.power === true}
				onChange={(checked: boolean) => {
					console.log("Switch is now:", checked);
				}}
			/> */}
		</div>
	</>);
};