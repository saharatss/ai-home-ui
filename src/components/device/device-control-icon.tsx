import Device, { DeviceType } from "@/types/device";
import DeviceIcons from "./device-icons";
import DeviceAPI from "@/api/device";
import { useDevices } from "@/context/device";
import { addToast, Spinner } from "@heroui/react";
import { useState } from "react";

const DeviceControlIcon = ({
	device,
	isControllable = true,
}: {
	device: Device;
	isControllable?: boolean;
}) => {

	const { setDevices } = useDevices();
	const [isChanging, setIsChanging] = useState(false);

	isControllable = isControllable && device.currentStatus?.power != null;

	const isActive = device.currentStatus?.power === true || device.currentStatus?.motion === true;

	const toggleDevicePower = async (device: Device) => {
		if (!isControllable) return;
		if (isChanging) return;
		setIsChanging(true);
		const response = await DeviceAPI.updateDeviceStatus(device.id, {
			...device.currentStatus,
			power: !device.currentStatus?.power,
		});
		if (response) {
			addToast({
				title: "Device status updated",
				description: `Device ${device.name} is now ${!device.currentStatus?.power ? "On" : "Off"}`,
				color: "success",
				timeout: 1000,
			});
			device.currentStatus = {
				...device.currentStatus,
				power: !device.currentStatus?.power,
			};
			setDevices((prevDevices) => {
				return prevDevices.map((d) => (d.id === device.id ? device : d));
			});
		}
		setIsChanging(false);
	}

	return (
		<div
			className={`
				flex items-center justify-center
				w-12 h-12 rounded-full
				${isActive ? "bg-black" : "bg-default-100/50"}
				${isControllable ? "cursor-pointer hover:opacity-80" : ""}
				transition-colors duration-200
			`}
			onClick={() => {
				if (isControllable) {
					toggleDevicePower(device);
				}
			}}
		>
			{isChanging ? (
				<Spinner
					size='sm'
					color={isActive ? "white" : "primary"}
				/>
			) : device.deviceType === DeviceType.SWITCH ? (
				isActive ? (
					<DeviceIcons.SwitchOnIcon size={24} color="white" />
				) : (
					<DeviceIcons.SwitchOffIcon size={24} color="black" />
				)
			) : device.deviceType === DeviceType.OUTLET ? (
				<DeviceIcons.OutletIcon size={24} color={isActive ? "white" : "black"} />
			) : device.deviceType === DeviceType.LIGHT ? (
				<DeviceIcons.LightIcon size={24} color={isActive ? "white" : "black"} />
			) : device.deviceType === DeviceType.THERMOSTAT ? (
				<DeviceIcons.ThermostatIcon size={24} color={isActive ? "white" : "black"} />
			) : device.deviceType === DeviceType.THERMOSTAT_SENSOR ? (
				<DeviceIcons.ThermostatSensorIcon size={24} color={isActive ? "white" : "black"} />
			) : device.deviceType === DeviceType.MOTION_SENSOR ? (
				<DeviceIcons.SensorIcon size={24} color={isActive ? "white" : "black"} />
			) : device.deviceType === DeviceType.LIGHT_SENSOR ? (
				<DeviceIcons.SensorIcon size={24} color={isActive ? "white" : "black"} />
			) : (
				<DeviceIcons.SensorIcon size={24} color={isActive ? "white" : "black"} />
			)}
		</div>
	)
}

export default DeviceControlIcon;